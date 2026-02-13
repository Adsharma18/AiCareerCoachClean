"""
Chat Router - Handles chat endpoints with database persistence.

This router:
- Detects language (Hindi vs English)
- Fetches conversation history from database
- Calls LLM service to generate response
- Saves both user and AI messages to database
- Handles errors gracefully
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from langdetect import detect, LangDetectException
from datetime import datetime
import logging

from ..dependencies import get_db
from ..models import ChatRequest, ChatResponse, ChatHistory
from ..services.llm_service import generate_llm_response

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/chat", response_model=ChatResponse)
async def chat_with_coach(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Main chat endpoint - handles user messages and returns AI responses.

    Steps:
    1. Validate input
    2. Detect language (Hindi or English)
    3. Fetch conversation history from database
    4. Generate AI response using LLM service
    5. Save both messages to database
    6. Return AI response
    """
    # -------- Input validation --------
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    if len(request.message) > 4000:
        raise HTTPException(status_code=400, detail="Message is too long (max 4000 characters).")
    
    if not request.session_id or not request.session_id.strip():
        raise HTTPException(status_code=400, detail="Session ID is required.")

    try:
        # -------- 1. Language detection --------
        is_hindi = False
        if request.message.strip():
            try:
                detected = detect(request.message)
                is_hindi = detected == "hi"
            except LangDetectException:
                # If detection fails, default to English
                logger.debug("Language detection failed, assuming English")
                pass

        # -------- 2. Fetch chat history from database --------
        result = await db.execute(
            select(ChatHistory)
            .where(ChatHistory.session_id == request.session_id)
            .order_by(ChatHistory.timestamp.asc())
        )
        history_records = result.scalars().all()

        # Convert database records to message list format (what LLM expects)
        history_messages = [
            {"role": h.role, "content": h.content}
            for h in history_records
        ]

        # Limit history to last 20 messages to avoid token limits
        if len(history_messages) > 20:
            history_messages = history_messages[-20:]
            logger.debug(f"Truncated history to last 20 messages for session {request.session_id}")

        # -------- 3. Generate AI response --------
        ai_reply = await generate_llm_response(
            user_message=request.message,
            history=history_messages,  # Pass structured history (list of dicts)
            is_hindi=is_hindi
        )

        # -------- 4. Save messages to database --------
        now = datetime.utcnow()

        # Save user message
        user_msg = ChatHistory(
            session_id=request.session_id,
            role="user",
            content=request.message,
            timestamp=now
        )

        # Save assistant message
        assistant_msg = ChatHistory(
            session_id=request.session_id,
            role="assistant",
            content=ai_reply,
            timestamp=now
        )

        db.add(user_msg)
        db.add(assistant_msg)

        # Commit transaction
        await db.commit()

        return ChatResponse(reply=ai_reply)

    except HTTPException:
        # Re-raise HTTP exceptions (like validation errors)
        await db.rollback()
        raise

    except Exception as e:
        # Rollback database transaction on any other error
        await db.rollback()
        logger.exception("Error in chat endpoint")
        
        # Return user-friendly error message
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request. Please try again."
        )

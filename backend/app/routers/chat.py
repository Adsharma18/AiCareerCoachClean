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
    try:
        # 1. Language detection (more robust)
        is_hindi = False
        if request.message.strip():
            try:
                detected = detect(request.message)
                is_hindi = detected == "hi"
            except LangDetectException:
                logger.debug("Language detection failed, assuming English")
                pass

        # 2. Fetch chat history
        result = await db.execute(
            select(ChatHistory)
            .where(ChatHistory.session_id == request.session_id)
            .order_by(ChatHistory.timestamp.asc())
        )
        history_records = result.scalars().all()

        # Better: keep history as list of messages (recommended for most LLMs)
        history_messages = [
            {"role": h.role, "content": h.content}
            for h in history_records
        ]

        # 3. Generate AI response
        # If your generate_llm_response accepts list of messages, use this:
        ai_reply = await generate_llm_response(
            user_message=request.message,
            history=history_messages,   # ← pass structured history
            is_hindi=is_hindi
        )

        # Alternative: if it still expects text history
        # history_text = "\n".join(f"{h.role}: {h.content}" for h in history_records)
        # ai_reply = await generate_llm_response(request.message, history_text, is_hindi)

        now = datetime.utcnow()

        # 4. Save user message
        user_msg = ChatHistory(
            session_id=request.session_id,
            role="user",
            content=request.message,
            timestamp=now
        )

        # 5. Save assistant message
        assistant_msg = ChatHistory(
            session_id=request.session_id,
            role="assistant",
            content=ai_reply,
            timestamp=now
        )

        db.add(user_msg)
        db.add(assistant_msg)

        # 6. Commit transaction
        await db.commit()

        return ChatResponse(reply=ai_reply)

    except Exception as e:
        # Rollback on any error
        await db.rollback()
        logger.exception("Error in chat endpoint")
        
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request. Please try again."
        )
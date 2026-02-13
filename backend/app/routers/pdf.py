# backend/app/routers/pdf.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..dependencies import get_db                          # assuming you have this
from ..models import ChatHistory, ChatRequest             # import your models
from ..services.pdf_services import generate_pdf_report    # real service function

router = APIRouter(prefix="/api", tags=["pdf"])

@router.post("/export-pdf")
async def download_career_plan(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Generate and download PDF of the career plan.
    Uses the last AI message in the session as the plan content.
    """
    # Use async query (correct way with AsyncSession)
    stmt = (
        select(ChatHistory)
        .where(ChatHistory.session_id == request.session_id)
        .order_by(ChatHistory.timestamp)
    )
    result = await db.execute(stmt)
    history = result.scalars().all()

    if not history:
        raise HTTPException(status_code=404, detail="No chat history found for this session")

    # Find the last message from assistant
    last_ai_message = None
    for msg in reversed(history):
        if msg.role.lower() == "assistant":
            last_ai_message = msg.content
            break

    if not last_ai_message:
        raise HTTPException(status_code=400, detail="No AI response found in this session")

    # Optional: get user goal (first user message)
    user_goal = None
    for msg in history:
        if msg.role.lower() == "user":
            user_goal = msg.content
            break

    # Generate PDF (the real function should return a file path)
    pdf_path = generate_pdf_report(
        plan_text=last_ai_message,
        career_goal=user_goal or "Not specified"
    )

    # Return the file as download
    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename="career_plan.pdf"
    )
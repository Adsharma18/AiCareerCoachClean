from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from pydantic import BaseModel
from .database import Base


# ───────────── SQLAlchemy Model ─────────────

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), index=True, nullable=False)
    role = Column(String(20), nullable=False)        # "user" or "assistant"
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)


# ───────────── Pydantic Models ─────────────

class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str

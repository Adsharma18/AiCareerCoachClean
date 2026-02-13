from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from groq import Groq
import logging

from .config import settings
from .database import engine, Base
from .models import ChatHistory  # Import models so tables are created

# For PDF generation
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from io import BytesIO
from fastapi.responses import StreamingResponse

logger = logging.getLogger(__name__)

# ------------------ ENV / CLIENT SETUP ------------------

if not settings.GROQ_API_KEY:
    # Fail fast at startup in a clear way, but do NOT print the key
    raise RuntimeError(
        "GROQ_API_KEY not found. Please add it to your .env file "
        "or environment before starting the backend."
    )

client = Groq(api_key=settings.GROQ_API_KEY)

# ------------------ APP SETUP ------------------

app = FastAPI(
    title="Career Debate Coach Backend",
    version="1.0.0",
    description="AI that debates career choices and generates roadmaps"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # ← change this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------ STARTUP HOOK ------------------

@app.on_event("startup")
async def startup_event():
    """
    Create database tables automatically when the app starts.
    
    This is beginner-friendly: you don't need to run migrations manually.
    SQLite will create the database file if it doesn't exist.
    """
    try:
        # Create all tables defined in models.py
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables created successfully (or already exist)")
    except Exception as e:
        logger.error(f"Failed to create database tables: {e}")
        # Don't crash the app - maybe database file is locked or permissions issue
        # But log it so you know something is wrong


# ------------------ MODELS ------------------

class Message(BaseModel):
    # Keep types simple, but we still explain clearly in comments
    role: str   # should be "user" or "assistant"
    content: str  # single chat message text

class ChatRequest(BaseModel):
    history: List[Message]
    message: str

class ChatResponse(BaseModel):
    reply: str

class ExportPDFRequest(BaseModel):
    content: str
    title: Optional[str] = "Career Roadmap & Advice"
    filename: Optional[str] = "career_roadmap.pdf"

# ------------------ ROUTES ------------------

@app.get("/")
def root():
    return {"status": "running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    # -------- Basic input validation (simple but important) --------
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    if len(req.message) > 4000:
        raise HTTPException(status_code=400, detail="Message is too long.")
    if len(req.history) > 50:
        raise HTTPException(
            status_code=400,
            detail="Too many messages in history. Please start a new session.",
        )

    system_prompt = """
You are a tough, honest, no-BS CAREER DEBATE COACH.

Your only job is to:
- Aggressively challenge the user's career idea or plan
- Present realistic downsides, risks, competition, failure rates, opportunity costs
- Play devil's advocate — do NOT just agree or be encouraging by default
- Force the user to defend their choice or rethink it
- Use direct, provocative, sometimes uncomfortable language ("Are you serious?", "This is a terrible idea unless…", "Most people who try this fail because…")
- Only give a roadmap / next steps AFTER the user has made a strong, realistic case — never give it automatically

Typical reply structure (follow this most of the time):
1. Acknowledge briefly what they said (1 sentence max)
2. Hit them with 2–3 strong counter-arguments or reality checks
3. Ask 1–2 sharp, uncomfortable questions to make them justify their decision
4. If they still haven't convinced you — do NOT give a roadmap yet
5. If they finally make a solid case — then (and only then) give a realistic, month-by-month roadmap + market context + practical actions
6. Always end with a question to keep the debate going

Be brutally honest. No sugar-coating. No generic motivation fluff.
The goal is to help them make a better decision — not to make them feel good.
"""

    messages = [{"role": "system", "content": system_prompt}]

    # Add conversation history
    for msg in req.history:
        messages.append({"role": msg.role, "content": msg.content})

    # Add current user message
    messages.append({"role": "user", "content": req.message})

    # Make the very first reply more challenging
    if len(req.history) == 0:
        system_prompt += "\nThis is the very first message — start by strongly questioning their career choice and showing why it might be a bad or risky idea."

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.85,       # higher = more opinionated / less predictable
            max_tokens=700,         # shorter, punchier replies
        )

        ai_reply = response.choices[0].message.content
        return ChatResponse(reply=ai_reply)

    except Exception as e:
        # Log full error on the server, but send a simple message to the client
        logger.exception("Error while calling Groq LLM")
        raise HTTPException(
            status_code=502,
            detail="AI service is currently unavailable. Please try again in a moment.",
        )


@app.post("/api/export-pdf")
def export_pdf(req: ExportPDFRequest):
    """
    Generate and return a PDF file from the provided content (usually career advice/roadmap)
    """
    if not req.content or not req.content.strip():
        raise HTTPException(status_code=400, detail="PDF content cannot be empty.")

    buffer = BytesIO()

    try:
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=inch,
        )

        styles = getSampleStyleSheet()
        styles.add(
            ParagraphStyle(
                name="TitleBold",
                fontName="Helvetica-Bold",
                fontSize=18,
                spaceAfter=20,
            )
        )
        styles.add(
            ParagraphStyle(
                name="Content",
                fontName="Helvetica",
                fontSize=11,
                leading=14,
                spaceAfter=12,
            )
        )

        story = []

        # Title
        story.append(Paragraph(req.title, styles["TitleBold"]))
        story.append(Spacer(1, 0.3 * inch))

        # Content — split by lines and wrap as paragraphs
        lines = req.content.split("\n")
        for line in lines:
            if line.strip():
                if line.startswith("## "):
                    story.append(Paragraph(line[3:].strip(), styles["Heading2"]))
                elif line.startswith("### "):
                    story.append(Paragraph(line[4:].strip(), styles["Heading3"]))
                elif line.strip().startswith("- ") or line.strip().startswith("* "):
                    story.append(
                        Paragraph(f"• {line.strip()[2:]}", styles["Content"])
                    )
                else:
                    story.append(Paragraph(line, styles["Content"]))
            else:
                story.append(Spacer(1, 0.15 * inch))

        doc.build(story)
        buffer.seek(0)

        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={req.filename}"
            },
        )

    except Exception:
        logger.exception("Error while generating inline PDF")
        raise HTTPException(
            status_code=500,
            detail="Could not generate PDF. Please try again.",
        )

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from groq import Groq
import os
from dotenv import load_dotenv

# ------------------ ENV SETUP ------------------

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY not found in .env file")

client = Groq(api_key=GROQ_API_KEY)

# ------------------ APP SETUP ------------------

app = FastAPI(
    title="Career Debate Coach Backend",
    version="1.0.0",
    description="AI that debates career choices and generates roadmaps"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ MODELS ------------------

class Message(BaseModel):
    role: str   # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    history: List[Message]
    message: str

class ChatResponse(BaseModel):
    reply: str

# ------------------ ROUTES ------------------

@app.get("/")
def root():
    return {"status": "running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    system_prompt = """
You are a CAREER DEBATE COACH.

RULES:
1. ALWAYS give a structured roadmap (month-wise or step-wise)
2. ALWAYS explain current market situation
3. ALWAYS give practical next actions
4. Be clear, direct, and motivating
5. Never repeat the user input
"""

    messages = [{"role": "system", "content": system_prompt}]

    # Add previous conversation
    for msg in req.history:
        messages.append({
            "role": msg.role,
            "content": msg.content
        })

    # Add latest user message
    messages.append({
        "role": "user",
        "content": req.message
    })

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.7,
            max_tokens=800
        )

        ai_reply = response.choices[0].message.content

        return ChatResponse(reply=ai_reply)

    except Exception as e:
        return ChatResponse(
            reply=f"Error from AI service: {str(e)}"
        )

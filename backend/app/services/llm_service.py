"""
LLM Service - Handles all Groq API calls for AI responses.

This service is kept simple and beginner-friendly:
- Uses async/await for better performance
- Accepts structured message history (list of dicts) - better for LLMs
- Handles errors gracefully
- Supports English and Hindi
"""

from groq import Groq
from typing import List, Dict, Optional
import logging

from ..config import settings

logger = logging.getLogger(__name__)

# Initialize Groq client once (reused for all requests)
client = Groq(api_key=settings.GROQ_API_KEY)

# System prompts for different languages
SYSTEM_PROMPT_EN = """
You are Coach Deb, an expert Career Debate Coach.

MANDATORY RULES:
1. ALWAYS give a clear structured roadmap (month-wise or step-wise)
2. ALWAYS explain current market demand & trends
3. ALWAYS give practical next actions
4. NEVER repeat the user's question
5. Be concise, structured, and realistic
"""

SYSTEM_PROMPT_HI = """
आप Coach Deb हैं – एक अनुभवी करियर कोच।

अनिवार्य नियम:
1. हमेशा स्पष्ट रोडमैप दें (महीनों में)
2. वर्तमान मार्केट डिमांड बताएं
3. अगले practical steps बताएं
4. यूज़र का सवाल दोहराएं नहीं
"""


async def generate_llm_response(
    user_message: str,
    history: Optional[List[Dict[str, str]]] = None,
    is_hindi: bool = False
) -> str:
    """
    Generate AI response using Groq LLM.

    Args:
        user_message: The current user message
        history: List of previous messages in format [{"role": "user", "content": "..."}, ...]
        is_hindi: If True, use Hindi system prompt

    Returns:
        AI response text (or error message if something goes wrong)
    """
    # Choose system prompt based on language
    system_prompt = SYSTEM_PROMPT_HI if is_hindi else SYSTEM_PROMPT_EN

    # Build messages list (this is what Groq API expects)
    messages = [{"role": "system", "content": system_prompt}]

    # Add conversation history if provided
    # History should already be in the right format: [{"role": "...", "content": "..."}]
    if history:
        # Filter out system messages from history (we already have one)
        for msg in history:
            if msg.get("role") != "system":
                messages.append({
                    "role": msg.get("role", "user"),
                    "content": msg.get("content", "")
                })

    # Add current user message
    messages.append({"role": "user", "content": user_message})

    try:
        # Call Groq API (this is synchronous, but we wrap it in async function)
        # In production, you might want to use asyncio.to_thread() for true async
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.6,  # Balanced creativity
            max_tokens=800    # Reasonable length
        )

        reply = completion.choices[0].message.content.strip()
        return reply

    except Exception as e:
        # Log the error for debugging, but return user-friendly message
        logger.exception("Error calling Groq LLM API")
        return "AI is temporarily unavailable. Please try again."

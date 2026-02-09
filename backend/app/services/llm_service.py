from groq import Groq
from ..config import settings

client = Groq(api_key=settings.GROQ_API_KEY)

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

def generate_llm_response(
    user_message: str,
    history_text: str,
    is_hindi: bool = False
):
    system_prompt = SYSTEM_PROMPT_HI if is_hindi else SYSTEM_PROMPT_EN

    messages = [
        {"role": "system", "content": system_prompt}
    ]

    if history_text:
        messages.append({
            "role": "assistant",
            "content": f"Previous conversation summary:\n{history_text}"
        })

    messages.append({
        "role": "user",
        "content": user_message
    })

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.6,
            max_tokens=800
        )

        return completion.choices[0].message.content.strip()

    except Exception as e:
        return "AI is temporarily unavailable. Please try again."

# CareerDebateCoach

**An AI-powered career guidance tool that debates pros/cons of your career goal and generates a personalized 6–12 month roadmap**



## 🎯 What is CareerDebateCoach?

CareerDebateCoach is a full-stack web application that helps users think critically about their career choices.

1. User enters their dream career goal  
2. AI debates pros, cons, alternatives, salary expectations, lifestyle impact, etc.  
3. User can reply and continue the conversation  
4. When ready, user types **"finalize"** or **"make plan"**  
5. AI generates a realistic 6–12 month step-by-step roadmap  
6. User can download the roadmap as a **PDF**

Supports **English + Hindi** (AI detects language and responds accordingly)

## ✨ Features

- Real-time back-and-forth career debate with Groq LLM (Llama 3.1 8B)
- Hindi language support (type in Hindi → get Hindi replies)
- Clean, modern chat interface (React + Tailwind)
- State management with **Zustand**
- Efficient data fetching & mutations with **TanStack Query**
- PDF roadmap export using **ReportLab** (backend)
- Responsive design (mobile + desktop)
- Beginner-friendly code structure & comments

## 🛠️ Tech Stack

| Layer       | Technology                          | Purpose                              |
|-------------|-------------------------------------|--------------------------------------|
| Frontend    | React 18 / 19 + Vite                | Fast development & build             |
| Styling     | Tailwind CSS                        | Utility-first CSS                    |
| State       | Zustand                             | Simple global state                  |
| Data Fetch  | TanStack Query (React Query)        | API calls & caching                  |
| Routing     | React Router DOM v6                 | Page navigation                      |
| Backend     | FastAPI (Python)                    | Lightweight & fast API               |
| Database    | SQLite                              | Simple local storage (MVP)           |
| AI          | Groq API — Llama-3.1-8B-Instant     | Fast & affordable LLM inference      |
| PDF         | ReportLab                           | Server-side PDF generation           |

CareerDebateCoach/
├── backend/                    # FastAPI + Groq + ReportLab
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── chat.py
│   │   │   └── pdf.py
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── llm_service.py
│   │       └── pdf_service.py
│   ├── .env
│   ├── requirements.txt
│   └── run.py
│
├── frontend/                   # React + Vite + Tailwind
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.svg
│   │   ├── components/
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── InputArea.jsx
│   │   │   └── PdfDownloadButton.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── ChatPage.jsx
│   │   ├── store/
│   │   │   └── chatStore.js
│   │   ├── hooks/
│   │   │   └── useChat.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.local
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
│
├── .gitignore
├── README.md
└── LICENSE

### Backend

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate   # Linux/Mac

pip install -r requirements.txt

# Create .env file and add your key
echo GROQ_API_KEY=your_groq_key_here > .env

# Run server
python run.py
# or: uvicorn app.main:app --reload
Backend runs on: http://localhost:8000
Frontend
Bashcd frontend

npm install

# Optional: set backend URL (if not using proxy)
# echo VITE_API_URL=http://localhost:8000 > .env.local

npm run dev
Frontend runs on: http://localhost:5173
Open browser → http://localhost:5173
🖥️ How to Use

Enter your career goal (e.g. "Become a data scientist in India")
Chat with AI — ask questions, debate pros/cons
When satisfied → type "finalize" or "make plan"
Get roadmap → click Download PDF

🎓 Resume / Portfolio Bullet Points
You can copy-paste/adapt these:

Developed CareerDebateCoach — full-stack AI career coaching web app using React 19, FastAPI, Groq Llama 3.1, and Tailwind CSS
Implemented real-time conversational debate with pros/cons analysis and dynamic 6–12 month roadmap generation
Integrated Groq API for fast LLM inference and ReportLab for server-side PDF generation
Used Zustand + TanStack Query for efficient state management and data fetching
Added Hindi language support via language detection in system prompt
Designed responsive, modern UI with clean component architecture

⚠️ Important Notes

Requires Groq API key (free tier available → https://console.groq.com/keys)
Currently runs locally (no deployment yet)
SQLite used for MVP — easy to swap with PostgreSQL later
No user authentication in MVP (stateless chat)

📄 License
MIT License
Feel free to use, modify, and share!

Made with ❤️ by ADITI

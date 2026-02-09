# backend/app/config.py
# This file keeps all secret settings and configurations (like API keys).
# We use .env file so secrets are not in code.

from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# Load variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # Groq API key (get it from https://console.groq.com/keys)
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")

    # Database URL (SQLite is simple — just a file on disk)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./career.db")

    # Secret key for security (you can generate any random string)
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-super-secret-key-change-me")

# Create one object we can use everywhere
settings = Settings()
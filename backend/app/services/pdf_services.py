# backend/app/services/pdf_service.py
from pathlib import Path
import os

def generate_pdf_report(plan_text: str, career_goal: str = "") -> str:
    """
    Placeholder PDF generator.
    In real implementation use: fpdf, reportlab, weasyprint, etc.
    Returns path to the generated PDF file.
    """
    # For now — create a simple text file and pretend it's PDF
    output_dir = Path("temp_pdfs")
    output_dir.mkdir(exist_ok=True)

    filename = f"career_plan_{os.urandom(4).hex()}.txt"  # change to .pdf later
    filepath = output_dir / filename

    with open(filepath, "w", encoding="utf-8") as f:
        f.write("CAREER PLAN\n\n")
        f.write(f"Goal: {career_goal}\n\n")
        f.write("Plan:\n")
        f.write(plan_text)

    return str(filepath)
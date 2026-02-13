# app/services/pdf_services.py
from pathlib import Path
import os
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
import logging

logger = logging.getLogger(__name__)

def generate_pdf_report(plan_text: str, career_goal: str = "") -> str:
    """
    Generate a professional PDF file from the career plan text using reportlab.
    
    Args:
        plan_text: The content from the AI's roadmap response
        career_goal: Optional career goal string
    
    Returns:
        str: Full path to the generated PDF file
    """
    try:
        # Create output directory
        output_dir = Path("temp_pdfs")
        output_dir.mkdir(exist_ok=True)

        # Unique filename with timestamp
        timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        filename = f"career_roadmap_{timestamp}.pdf"
        filepath = output_dir / filename

        # Create PDF document
        doc = SimpleDocTemplate(
            str(filepath),
            pagesize=letter,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=72
        )

        styles = getSampleStyleSheet()
        title_style = styles['Title']
        heading_style = styles['Heading2']
        normal_style = styles['Normal']
        bullet_style = styles['BodyText']

        story = []

        # Title
        story.append(Paragraph("Career Roadmap & Debate Summary", title_style))
        story.append(Spacer(1, 0.4 * inch))

        # Goal
        if career_goal.strip():
            story.append(Paragraph(f"Career Goal: {career_goal}", heading_style))
            story.append(Spacer(1, 0.3 * inch))

        # Generated date
        story.append(Paragraph(
            f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}",
            normal_style
        ))
        story.append(Spacer(1, 0.5 * inch))

        # Main content header
        story.append(Paragraph("Detailed Roadmap / Plan:", heading_style))
        story.append(Spacer(1, 0.3 * inch))

        # Process plan_text line by line
        for line in plan_text.split('\n'):
            line = line.strip()
            if not line:
                story.append(Spacer(1, 0.15 * inch))
                continue

            # Handle bullet points or numbered items
            if line.startswith(('-', '*', '•', '1.', '2.', '3.', '4.', '5.')):
                cleaned = line.lstrip('-*•123456789. ').strip()
                story.append(Paragraph(f"• {cleaned}", bullet_style))
            else:
                story.append(Paragraph(line, normal_style))
            story.append(Spacer(1, 0.12 * inch))

        # Build PDF
        doc.build(story)

        logger.info(f"PDF generated successfully: {filepath}")
        return str(filepath)

    except Exception as e:
        logger.exception("PDF generation failed")
        # Fallback text file
        fallback_path = output_dir / f"error_report_{timestamp}.txt"
        with open(fallback_path, "w", encoding="utf-8") as f:
            f.write(f"PDF generation failed: {str(e)}\n\nOriginal content:\n{plan_text}")
        return str(fallback_path)
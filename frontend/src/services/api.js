// api.js - All backend API calls live here

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function sendChatMessage({ history, message }) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ history, message }),
  });

  if (!res.ok) throw new Error('API error');
  return res.json();
}

export async function sendPdfRequest(content) {
  const res = await fetch(`${API_BASE}/api/export-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error('PDF generation failed');
  return res.blob();
}
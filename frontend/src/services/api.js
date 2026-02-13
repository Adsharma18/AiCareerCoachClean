// src/services/api.js

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getErrorMessage = async (response) => {
  try {
    const data = await response.json();
    return data.detail || data.message || `Server error ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

/**
 * Send chat message to backend
 */
export async function sendChatMessage({ history, message }) {
  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history, message }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errorMsg = await getErrorMessage(response);
      throw new Error(errorMsg);
    }

    return response.json();
  } catch (error) {
    console.error('Chat API failed:', error);
    throw new Error(error.message || 'Failed to connect to chat API');
  }
}

/**
 * Request PDF export using the provided content
 * @param {string} content - The text content (usually the latest AI reply)
 * @param {string} [title="Career Roadmap"] - PDF document title
 * @param {string} [filename="roadmap.pdf"] - Suggested download filename
 * @returns {Promise<Blob>} PDF file as blob
 */
export async function sendPdfRequest(
  content,
  title = "Career Roadmap",
  filename = "roadmap.pdf"
) {
  if (!content || typeof content !== 'string' || content.trim() === '') {
    throw new Error("Cannot export empty or invalid content to PDF");
  }

  try {
    console.log('[PDF Export] Sending content (first 100 chars):', content.substring(0, 100));

    const response = await fetch(`${API_BASE}/api/export-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        title,
        filename,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errorMsg = await getErrorMessage(response);
      console.error('[PDF Export] Failed:', response.status, errorMsg);
      throw new Error(errorMsg);
    }

    const blob = await response.blob();
    console.log('[PDF Export] Received blob, size:', blob.size);
    return blob;
  } catch (error) {
    console.error('[PDF Export] API call failed:', error);
    throw new Error(error.message || 'Failed to generate or download PDF');
  }
}
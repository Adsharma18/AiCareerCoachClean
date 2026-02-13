// PdfDownloadButton.jsx
import { saveAs } from 'file-saver';
import { sendPdfRequest } from '../services/api';

const PdfDownloadButton = ({ content }) => {
  const handleDownload = async () => {
    if (!content?.trim()) {
      alert('No content available to export.');
      return;
    }

    try {
      const blob = await sendPdfRequest(
        content,
        "My Career Roadmap & Advice",      // optional
        "career-roadmap.pdf"               // optional
      );
      saveAs(blob, "Career_Roadmap.pdf");
    } catch (err) {
      console.error(err);
      alert('Failed to download PDF: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!content?.trim()}
      className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-50"
    >
      Download Roadmap as PDF
    </button>
  );
};

export default PdfDownloadButton;
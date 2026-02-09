// PdfDownloadButton.jsx - Triggers PDF download

import { saveAs } from 'file-saver';
import { sendPdfRequest } from '../services/api';

const PdfDownloadButton = ({ content }) => {
  const handleDownload = async () => {
    try {
      const blob = await sendPdfRequest(content);
      saveAs(blob, 'Career_Roadmap.pdf');
    } catch (err) {
      alert('Failed to download PDF. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
    >
      Download Roadmap as PDF
    </button>
  );
};

export default PdfDownloadButton;
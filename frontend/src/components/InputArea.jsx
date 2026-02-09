// InputArea.jsx - Message input + send button

import { useState } from 'react';

const InputArea = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message... (type 'finalize' or 'make plan' to get roadmap)"
        className="flex-1 p-3 border rounded-lg resize-none h-12 focus:outline-none focus:border-blue-500"
        disabled={disabled}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        Send
      </button>
    </div>
  );
};

export default InputArea;
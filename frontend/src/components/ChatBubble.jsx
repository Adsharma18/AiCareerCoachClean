// ChatBubble.jsx
// Displays a single message in the chat — user messages on the right, AI on the left

const ChatBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`
          max-w-[80%] 
          px-4 py-3 
          rounded-2xl 
          shadow-sm
          ${isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200'
          }
        `}
      >
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
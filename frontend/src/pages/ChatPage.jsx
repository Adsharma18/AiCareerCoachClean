// src/pages/ChatPage.jsx
import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/chatStore';
import ChatBubble from '../components/ChatBubble';
import InputArea from '../components/InputArea';
import PdfDownloadButton from '../components/PdfDownloadButton';
import { useChat } from '../hooks/useChat';
import Navbar from '../components/Navbar';

const ChatPage = () => {
  const { messages, addMessage, goal } = useChatStore();
  const { mutate: sendMessage, isPending } = useChat();
  const [lastError, setLastError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  const handleSend = (text) => {
    if (!text || !text.trim()) return;
    const userMessage = { role: 'user', content: text.trim() };
    addMessage(userMessage);
    setLastError(null);

    sendMessage(
      {
        history: messages,
        message: text.trim(),
      },
      {
        onSuccess: (data) => {
          addMessage({
            role: 'assistant',
            content: data?.reply || 'No response from coach.',
          });
          setLastError(null);
        },
        onError: (err) => {
          const errorMessage = err?.message || 'Something went wrong. Please try again.';
          setLastError(errorMessage);
          addMessage({
            role: 'assistant',
            content: `❌ Error: ${errorMessage}`,
            isError: true,
          });
        },
      }
    );
  };

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMessage) {
        const filteredMessages = messages.filter(m => !m.isError);
        useChatStore.setState({ messages: filteredMessages });
        handleSend(lastUserMessage.content);
      }
    }
  };

  const lastMsg = messages[messages.length - 1];
  const showPdfButton =
    lastMsg?.role === 'assistant' &&
    typeof lastMsg.content === 'string' &&
    (lastMsg.content.toLowerCase().includes('month') ||
      lastMsg.content.toLowerCase().includes('roadmap') ||
      lastMsg.content.includes('महीने') ||
      lastMsg.content.includes('रोडमैप'));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 flex flex-col">
      <Navbar />

      {/* Header - consistent with Home.jsx style */}
      <header className="bg-gray-900/70 backdrop-blur-sm border-b border-gray-800 px-5 py-5 sm:py-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Debating: <span className="text-green-400">{goal || 'Your Career'}</span>
          </h2>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
              <div className="text-7xl mb-6 opacity-70">💬</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-200">
                Start your career discussion
              </h3>
              <p className="text-gray-400 max-w-md">
                Share your goal, ask questions, or get honest feedback — the coach is ready.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <ChatBubble key={index} message={msg} />
            ))
          )}

          {isPending && (
            <div className="flex justify-start">
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="text-gray-300 text-sm font-medium">AI is thinking...</span>
              </div>
            </div>
          )}

          {lastError && !isPending && (
            <div className="flex justify-start">
              <div className="bg-red-900/30 border border-red-700/50 rounded-2xl px-6 py-4 max-w-md">
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-xl">⚠️</div>
                  <div className="flex-1">
                    <p className="text-red-300 text-sm font-medium mb-2">Failed to send message</p>
                    <p className="text-red-400/80 text-xs mb-3">{lastError}</p>
                    <button
                      onClick={handleRetry}
                      className="text-xs px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg text-red-300 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input + PDF Button */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 px-4 py-5">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 shadow-xl">
            <InputArea onSend={handleSend} disabled={isPending} />

            {showPdfButton && lastMsg?.content && (
              <div className="mt-6 flex justify-center">
                <PdfDownloadButton
                  content={lastMsg.content}
                  className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-green-900/30 hover:shadow-green-700/40 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Download Roadmap (PDF)
                </PdfDownloadButton>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;

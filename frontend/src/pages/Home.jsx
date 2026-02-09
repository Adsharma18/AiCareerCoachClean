// src/pages/Home.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← make sure you have react-router-dom installed
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!goal.trim()) return;

    setIsSubmitting(true);

    // Small delay for better UX + prevent double click
    setTimeout(() => {
      // Navigate to chat page and pass the goal via state
      navigate('/chat', { state: { initialGoal: goal } });
      setIsSubmitting(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <Navbar />

      <main className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-green-400">Career</span> Debate Coach
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto">
            Enter your career goal and let AI debate the pros & cons, suggest better alternatives,  
            and when you're ready — build a realistic <span className="text-green-400 font-semibold">6–12 month roadmap</span>.
          </p>

          <div className="w-full max-w-2xl mx-auto bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-xl">
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Become a full-stack web developer in India"
              className="w-full p-4 text-lg bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              disabled={isSubmitting}
              autoFocus
            />

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !goal.trim()}
              className={`
                mt-6 w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-300
                ${isSubmitting || !goal.trim()
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-lg shadow-green-900/30 hover:shadow-green-700/40'
                }
                text-white flex items-center justify-center gap-3
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Starting Debate...
                </>
              ) : (
                'Start Debate →'
              )}
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-gray-400">
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">⚡</span>
              <span>Fast AI Debate</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">🗺️</span>
              <span>Personalized Roadmap</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">📄</span>
              <span>PDF Export</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">🌐</span>
              <span>Hindi Support</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
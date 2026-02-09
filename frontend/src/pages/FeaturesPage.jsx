// src/pages/FeaturesPage.jsx
import Navbar from '../components/Navbar';
import Features from '../components/Features';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow">
        {/* Hero / Introduction section */}
        <section className="py-16 md:py-20 border-b border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Features of <span className="text-green-400">CareerDebateCoach</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover how our AI-powered tool helps you make better career decisions with clarity and confidence
            </p>
          </div>
        </section>

        {/* Features section */}
        <Features />

        {/* Final CTA section */}
        <section className="py-16 md:py-20 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to clarify your career path?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Start debating your goals right now — it's free and takes just seconds to begin.
            </p>
            <a
              href="/chat"
              className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-xl transition-all duration-300 shadow-lg shadow-green-900/30 hover:shadow-green-700/40 transform hover:-translate-y-1"
            >
              Start Your Career Debate →
            </a>
          </div>
        </section>
      </main>

      {/* Simple footer (optional) */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} CareerDebateCoach • Made by Aditi </p>
      </footer>
    </div>
  );
}
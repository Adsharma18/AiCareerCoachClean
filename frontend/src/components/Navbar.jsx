import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-400">
              CareerDebateCoach
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-green-400 transition"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-gray-300 hover:text-green-400 transition"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-green-400 transition"
            >
              About
            </Link>
            <Link
              to="/chat"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition"
            >
              Start Debate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navbar Row */}
        <div className="flex items-center justify-between h-16">

          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Career Debate Coach"
              className="h-20 w-auto object-contain"
            />

            {/* Optional Title (hidden on small screens) */}
            <span className="hidden sm:block text-green-400 font-semibold text-lg tracking-wide">
              Career Debate Coach
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-gray-300 hover:text-green-400 transition duration-200"
            >
              Home
            </Link>

            <Link
              to="/features"
              className="text-gray-300 hover:text-green-400 transition duration-200"
            >
              Features
            </Link>

            <Link
              to="/about"
              className="text-gray-300 hover:text-green-400 transition duration-200"
            >
              About
            </Link>

            <Link
              to="/chat"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition duration-200 shadow"
            >
              Start Debate
            </Link>

          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-3xl focus:outline-none"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 border-t border-gray-800 pt-4">

            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-300 hover:text-green-400"
            >
              Home
            </Link>

            <Link
              to="/features"
              onClick={closeMenu}
              className="text-gray-300 hover:text-green-400"
            >
              Features
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="text-gray-300 hover:text-green-400"
            >
              About
            </Link>

            <Link
              to="/chat"
              onClick={closeMenu}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-center"
            >
              Start Debate
            </Link>

          </div>
        </div>

      </div>
    </nav>
  );
}
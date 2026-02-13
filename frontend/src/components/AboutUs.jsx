// src/components/AboutUs.jsx
export default function AboutUs() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            About <span className="text-green-400">CareerDebateCoach</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A simple, honest tool to help you make better career decisions — no fluff, no pressure, just clarity.
          </p>
        </div>

        {/* Intro Paragraph */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Choosing a career path is one of the biggest decisions you'll ever make. 
            Yet most people face it alone — with confusing advice, fear of missing out, 
            or pressure from family and society.
            <br /><br />
            CareerDebateCoach exists to change that. We give you a space to think out loud, 
            debate real pros and cons, explore hidden alternatives, and build a realistic 
            roadmap — powered by fast, honest AI.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Our Mission */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                We want every student, professional, and career changer to feel confident 
                in their next step — not pressured or confused.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-6">
                CareerDebateCoach is built to help you:
              </p>
              <ul className="mt-5 space-y-4 text-lg text-gray-300 list-none">
                <li className="flex items-start gap-4">
                  <span className="text-green-400 text-2xl flex-shrink-0">→</span>
                  <span>Explore real pros, cons, and alternatives honestly</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-400 text-2xl flex-shrink-0">→</span>
                  <span>Get structured, month-by-month roadmaps grounded in reality</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-400 text-2xl flex-shrink-0">→</span>
                  <span>Debate your doubts and fears without judgment</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-400 text-2xl flex-shrink-0">→</span>
                  <span>Make decisions based on facts, not hype or fear</span>
                </li>
              </ul>
            </div>

            {/* Core Values */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                What We Stand For
              </h3>
              <ul className="space-y-5 text-lg text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-green-400 text-2xl flex-shrink-0">★</span>
                  <span>Truth over comfort — we tell it like it is, even when it's tough</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-400 text-2xl flex-shrink-0">★</span>
                  <span>Realism over hype — no false promises, just practical steps</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-400 text-2xl flex-shrink-0">★</span>
                  <span>Clarity through debate — asking hard questions leads to better answers</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-400 text-2xl flex-shrink-0">★</span>
                  <span>Accessibility — free, fast, and available to anyone who needs it</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Quick Facts + Why It Exists */}
          <div className="lg:sticky lg:top-8 space-y-12">
            <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-10 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8 text-center">
                Quick Facts
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="text-5xl">🇮🇳</div>
                  <div>
                    <p className="text-xl font-medium text-white">Proudly Indian</p>
                    <p className="text-gray-400 mt-2">
                      Created by a final-year student from Uttar Pradesh who saw friends struggling with career confusion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="text-5xl">🚀</div>
                  <div>
                    <p className="text-xl font-medium text-white">Lightning Fast AI</p>
                    <p className="text-gray-400 mt-2">
                      Powered by Groq + Llama-3.1 — responses in seconds, not minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="text-5xl">🎓</div>
                  <div>
                    <p className="text-xl font-medium text-white">Completely Free</p>
                    <p className="text-gray-400 mt-2">
                      No subscriptions, no limits, no ads — made for students, learners, and career switchers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="text-5xl">🛠️</div>
                  <div>
                    <p className="text-xl font-medium text-white">Built with Purpose</p>
                    <p className="text-gray-400 mt-2">
                      A real-world project created to help people, not just to look good on a resume.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why This Tool Exists */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                Why We Built This
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                I saw too many friends and classmates stuck — choosing wrong courses, 
                accepting jobs they hated, or delaying decisions out of fear.
                <br /><br />
                Traditional career advice is often too generic or sugar-coated. 
                We wanted something different: a tool that acts like a brutally honest mentor 
                who helps you think deeply, debate internally, and move forward with clarity.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-6">
                CareerDebateCoach is that tool — simple, fast, free, and built for real people.
              </p>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="mt-20 md:mt-24 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to get clear about your future?
          </h3>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            No more confusion. No more endless scrolling through advice. 
            Just honest conversation and a clear path forward.
          </p>

          <a
            href="/chat"
            className="inline-flex items-center px-10 py-5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-xl font-semibold rounded-xl transition-all duration-300 shadow-xl shadow-green-900/40 hover:shadow-green-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Start Your Career Debate Now →
          </a>
        </div>
      </div>
    </section>
  );
}

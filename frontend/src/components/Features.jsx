// src/components/Features.jsx
const features = [
  {
    icon: "🧠",
    title: "AI-Powered Debate",
    description:
      "Engage in real-time, structured debates with AI — explore your career goals, doubts, and options honestly and deeply.",
    color: "from-green-900/30 to-emerald-900/20",
  },
  {
    icon: "⚖️",
    title: "Pros, Cons & Alternatives",
    description:
      "Get brutally honest feedback — clear advantages, real disadvantages, and practical alternative paths you might not have considered.",
    color: "from-blue-900/30 to-indigo-900/20",
  },
  {
    icon: "🗺️",
    title: "Personalized Roadmap",
    description:
      "Receive a realistic, step-by-step 6–12 month action plan tailored to your situation, market reality, and current skills.",
    color: "from-purple-900/30 to-violet-900/20",
  },
  {
    icon: "📄",
    title: "PDF Export",
    description:
      "Download your final roadmap, debate summary, or action plan as a clean, professional PDF — easy to save, print, or share.",
    color: "from-amber-900/30 to-orange-900/20",
  },
  {
    icon: "🌍",
    title: "Hindi & English Support",
    description:
      "Chat naturally in English or Hindi — the AI automatically detects your language and responds in the same language.",
    color: "from-teal-900/30 to-cyan-900/20",
  },
  {
    icon: "⚡",
    title: "Ultra-Fast Responses",
    description:
      "Powered by Groq's lightning-fast inference — thoughtful, high-quality answers in seconds, not minutes.",
    color: "from-rose-900/30 to-pink-900/20",
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Powerful Features to Guide Your Career
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to explore options, debate honestly, and build a clear, realistic path forward
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                group relative overflow-hidden rounded-2xl p-8 border border-gray-800
                bg-gray-900/40 backdrop-blur-sm transition-all duration-500
                hover:border-green-700/50 hover:shadow-xl hover:shadow-green-900/20
                hover:-translate-y-1
              `}
            >
              {/* Subtle animated gradient background on hover */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 
                  group-hover:opacity-100 transition-opacity duration-700
                `}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-green-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            These features work together to help you move from confusion to confidence — faster and with real clarity.
          </p>

          <a
            href="/chat"
            className="
              inline-flex items-center px-10 py-5 bg-green-600 hover:bg-green-700 active:bg-green-800
              text-white text-xl font-semibold rounded-xl transition-all duration-300
              shadow-xl shadow-green-900/40 hover:shadow-green-700/50 transform hover:-translate-y-1
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-950
            "
          >
            Try It Now – Start Your Debate →
          </a>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import FeaturesSection from "./components/FeaturesSection";
import ChatbotDemoSection from "./components/ChatbotDemoSection";
import CaseStudySection from "./components/CaseStudySection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">✦</span>
          <span className="text-xl font-semibold tracking-tight">Adabot</span>
        </div>
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#innovations" className="hover:text-blue-600 transition">Innovations</a>
          <a href="#features" className="hover:text-blue-600 transition">Product</a>
          <a href="#pricing" className="hover:text-blue-600 transition">Pricing</a>
          <a href="#resources" className="hover:text-blue-600 transition">Resources</a>
        </nav>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 transition">Sign in</button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Sign Up Free</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-1 text-center md:text-left px-4 pt-20 pb-24 max-w-7xl mx-auto w-full">
        {/* Floating Cards */}
        <div className="flex flex-col gap-6 md:gap-8 md:w-1/2 items-center md:items-start mb-10 md:mb-0">
          <div className="bg-white shadow-lg rounded-xl p-4 w-64 h-32 flex flex-col items-start justify-between border border-blue-100">
            <span className="text-xs text-gray-400">Bot reporting</span>
            <span className="font-bold text-lg text-blue-600">98%</span>
            <span className="text-xs text-gray-500">Satisfaction rate</span>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-4 w-64 h-32 flex flex-col items-start justify-between border border-blue-100">
            <span className="text-xs text-gray-400">Guest list key</span>
            <span className="font-bold text-lg text-blue-600">+40%</span>
            <span className="text-xs text-gray-500">Response rate</span>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-4 w-64 h-32 flex flex-col items-start justify-between border border-blue-100">
            <span className="text-xs text-gray-400">User list</span>
            <span className="font-bold text-lg text-blue-600">5,000+</span>
            <span className="text-xs text-gray-500">Active users</span>
          </div>
        </div>
        {/* Hero Content & Chat UI Illustration */}
        <div className="flex flex-col items-center md:items-start md:w-1/2 gap-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 max-w-3xl leading-tight md:leading-tight">
            A Powerful Virtual Assistant <br className="hidden md:block" /> With AI Powered
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
            Hire virtual assistant without headache support with AI technology.
          </p>
          <form className="flex w-full max-w-md mx-auto mb-10">
            <input
              type="email"
              placeholder="Enter your email here"
              className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 transition"
            >
              Request demo
            </button>
          </form>
          {/* Chat UI SVG Illustration */}
          <div className="hidden md:block mt-4">
            <svg width="340" height="120" viewBox="0 0 340 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="340" height="120" rx="20" fill="#F8FAFC" />
              <rect x="24" y="24" width="120" height="24" rx="8" fill="#E0E7EF" />
              <rect x="24" y="56" width="200" height="24" rx="8" fill="#E0E7EF" />
              <rect x="24" y="88" width="80" height="16" rx="6" fill="#E0E7EF" />
              <rect x="160" y="24" width="120" height="24" rx="8" fill="#D1FAE5" />
              <rect x="240" y="56" width="76" height="24" rx="8" fill="#DBEAFE" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Chatbot Demo Section */}
      <ChatbotDemoSection />

      {/* Case Study Section */}
      <CaseStudySection />
      <CTASection />
      <Footer />
    </div>
  );
} 
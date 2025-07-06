export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center relative overflow-hidden" id="cta">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Are you ready to engage your customers more effectively?
        </h2>
        <p className="text-lg mb-8">
          Sign up and start using Adabot to boost your customer engagement today.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <button className="px-8 py-3 bg-white text-blue-700 font-bold rounded-lg shadow hover:bg-blue-100 transition">Sign Up Free</button>
          <button className="px-8 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-700 transition">Sign In</button>
        </div>
        {/* Chat UI SVG Illustration */}
        <div className="flex justify-center mt-12">
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
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 to-blue-400/10 pointer-events-none z-0" />
    </section>
  );
} 
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
        {/* Chat UI Illustration */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-4 w-64 text-left text-gray-800">
            <div className="font-semibold mb-2">Help Center</div>
            <div className="bg-blue-50 rounded p-2 mb-2">How can I help you today?</div>
            <div className="bg-blue-100 rounded p-2 text-right">I need help with my order.</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 w-64 text-left text-gray-800">
            <div className="font-semibold mb-2">Products</div>
            <div className="bg-blue-50 rounded p-2 mb-2">Would you like to see our latest features?</div>
            <div className="bg-blue-100 rounded p-2 text-right">Yes, show me!</div>
          </div>
        </div>
      </div>
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 to-blue-400/10 pointer-events-none z-0" />
    </section>
  );
} 
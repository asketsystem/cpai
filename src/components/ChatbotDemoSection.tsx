export default function ChatbotDemoSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white" id="chatbot-demo">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-4">
          Develop customer service that sells your products and services
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Advanced AI, automations, and chatbot flows combine to create the best Adabot for your business.
        </p>
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          {/* Light Chat UI */}
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md border border-blue-100">
            <div className="mb-4 text-sm text-gray-500 font-semibold">Start your prompt here!</div>
            <div className="bg-gray-100 rounded-lg p-3 mb-4 text-left text-gray-700">Do you provide solutions here?</div>
            <form className="flex gap-2 mb-4">
              <input type="text" placeholder="Type your prompt here..." className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Send</button>
            </form>
          </div>
          {/* Dark Chat UI */}
          <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-800 text-white">
            <div className="mb-4 text-sm text-gray-400 font-semibold">Adabot Service</div>
            <div className="bg-gray-800 rounded-lg p-3 mb-4 text-left text-gray-200">adabot: Here are a few options based on your request. Please make your selection to continue:</div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Please select which topic you would like:</label>
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-blue-700 transition">Funny</button>
                <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-blue-700 transition">Casual</button>
                <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-blue-700 transition">Unobtrusive</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
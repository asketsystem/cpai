const features = [
  {
    icon: "💡",
    title: "Helps agents help customers",
    desc: "AI-powered chatbots provide instant answers, freeing up human agents for complex issues."
  },
  {
    icon: "⚡",
    title: "Speeds automation",
    desc: "Automate routine tasks and responses, increasing efficiency and reducing costs."
  },
  {
    icon: "🔒",
    title: "It's safe and effective",
    desc: "Enterprise-grade security and privacy for all customer interactions."
  },
  {
    icon: "📈",
    title: "Improves self-service rates",
    desc: "Empower customers to resolve issues on their own, improving satisfaction."
  },
  {
    icon: "🔍",
    title: "Reveals unknown unknowns",
    desc: "Gain insights from customer conversations to improve your products and services."
  }
];

export default function FeaturesSection() {
  return (
    <section id="innovations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-6">
          Innovations in the field of chatbots
          <br className="hidden md:block" />
          <span className="text-blue-600">that transform the industry</span>
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          With our advanced chatbot solutions, you'll increase customer engagement and efficiency to a whole new level.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="bg-blue-50 rounded-2xl shadow p-10 flex flex-col items-center text-center border border-blue-100 min-h-[220px]">
              <div className="text-5xl mb-6">{f.icon}</div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">{f.title}</h3>
              <p className="text-gray-600 text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
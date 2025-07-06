const stats = [
  { value: "+40%", label: "Carbon Health", desc: "Automation reduces patient wait times and boosts click answer rates 40%" },
  { value: "-50%", label: "Farfetch Automation", desc: "Improves handle time by 50%" },
  { value: "+26%", label: "JK Moving Services", desc: "AI-based optimization increases sales conversation by 26%" }
];

const companies = [
  "Evernote", "Airwallex", "databricks", "HELLOSIGN", "Razorpay"
];

export default function CaseStudySection() {
  return (
    <section className="py-20 bg-white" id="case-study">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-4">
          A real-life example of Adabot success with real-life stories
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10 mt-12 mb-12">
          {/* Testimonial */}
          <div className="flex flex-col items-center md:items-start md:w-1/2">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-24 h-24 rounded-full mb-4 shadow-lg" />
            <p className="text-lg text-gray-700 mb-2 text-center md:text-left">
              Embark on a journey of innovation and trust as we uncover how Adabot reshaped customer engagement, streamlined workflows, and delighted users across diverse industries.
            </p>
            <span className="font-semibold text-blue-600">- Adabot Customer</span>
          </div>
          {/* Stats Cards */}
          <div className="flex flex-col gap-6 md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-blue-50 rounded-2xl shadow p-6 flex flex-col items-center border border-blue-100">
                  <span className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</span>
                  <span className="font-semibold text-gray-900 mb-1">{stat.label}</span>
                  <span className="text-gray-600 text-sm text-center">{stat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Company Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-8 opacity-80">
          {companies.map((company, i) => (
            <span key={i} className="text-lg font-semibold text-gray-500 tracking-wide uppercase">{company}</span>
          ))}
        </div>
      </div>
    </section>
  );
} 
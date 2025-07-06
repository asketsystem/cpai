export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 border-b border-gray-800 pb-10">
          {/* Brand/Logo/Description */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-blue-500">✦</span>
              <span className="text-xl font-semibold tracking-tight">Adabot</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Adabot is an AI-powered virtual assistant platform designed to transform customer engagement for modern businesses.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://github.com/franckasket/cpai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                {/* GitHub SVG */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1-2.75-.1-.26-.44-1.3.09-2.7 0 0 .83-.27 2.75 1.02A9.36 9.36 0 0112 6.84c.84.004 1.68.11 2.47.32 1.92-1.29 2.75-1.02 2.75-1.02.53 1.4.19 2.44.09 2.7.62.72 1 1.63 1 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" /></svg>
              </a>
              <a href="https://twitter.com/franckasket" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                {/* Twitter SVG */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 012 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 007.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0024 4.59a8.36 8.36 0 01-2.54.7z" /></svg>
              </a>
            </div>
          </div>
          {/* Product */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
              <li><a href="#chatbot-demo" className="hover:text-blue-400 transition">Demo</a></li>
              <li><a href="#case-study" className="hover:text-blue-400 transition">Case Studies</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition">Pricing</a></li>
            </ul>
          </div>
          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Customer Support</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Sales Automation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Integrations</a></li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Docs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Community</a></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Legal</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>
        </div>
        {/* Legal Row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs text-gray-500">
          <div>&copy; {new Date().getFullYear()} Adabot. All rights reserved.</div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
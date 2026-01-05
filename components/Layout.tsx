
import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (view: 'home' | 'generator' | 'articles') => void;
  activeView: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, activeView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'generator', label: 'Generator' },
    { id: 'articles', label: 'Insights' }
  ];

  const handleNav = (id: 'home' | 'generator' | 'articles') => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group shrink-0" 
              onClick={() => handleNav('home')}
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2.5 rounded-xl mr-3 shadow-lg shadow-blue-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter uppercase hidden sm:block">
                EasyPolicy<span className="text-blue-600">Tool</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNav(item.id as any)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    activeView === item.id 
                      ? 'bg-blue-50 text-blue-700 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleNav('generator')}
                className="relative bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-black hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5 active:scale-95 group overflow-hidden"
              >
                <span className="relative z-10">Create Policy</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:animate-ping pointer-events-none"></span>
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-100 bg-white ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNav(item.id as any)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-base font-bold transition-all ${
                  activeView === item.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-50">
              <button 
                onClick={() => handleNav('generator')}
                className="w-full bg-blue-600 text-white px-5 py-4 rounded-2xl font-black text-center shadow-lg shadow-blue-100"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <div className="flex items-center mb-6 cursor-pointer" onClick={() => handleNav('home')}>
                <div className="bg-blue-600 text-white p-1.5 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">EasyPolicyTool</span>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-sm mb-8 text-lg font-medium">
                Deterministic legal generation for the modern web. We provide small businesses with high-fidelity compliance documents in seconds.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Solutions</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => handleNav('generator')} className="text-slate-500 hover:text-blue-600 transition-colors">Privacy Engine</button></li>
                <li><button onClick={() => handleNav('generator')} className="text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</button></li>
                <li><button onClick={() => handleNav('generator')} className="text-slate-500 hover:text-blue-600 transition-colors">Cookie Governance</button></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => handleNav('articles')} className="text-slate-500 hover:text-blue-600 transition-colors">Compliance Hub</button></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>
                </div>
                <h4 className="font-bold mb-2">Legal Disclaimer</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  EasyPolicyTool provides deterministic automated templates. We are not a law firm. Use of our tools does not create an attorney-client relationship.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-bold text-slate-400">
            <p>&copy; {new Date().getFullYear()} EasyPolicyTool. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

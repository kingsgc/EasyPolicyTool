
import React, { useState } from 'react';
import Layout from './components/Layout';
import PolicyGenerator from './components/PolicyGenerator';
import { ARTICLES } from './constants';
import { Article } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'generator' | 'articles'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const navigateTo = (view: 'home' | 'generator' | 'articles') => {
    setActiveView(view);
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setActiveView('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout onNavigate={navigateTo} activeView={activeView}>
      {activeView === 'home' && (
        <div className="space-y-32 pb-32">
          {/* Superhuman Hero Section */}
          <section className="relative pt-32 pb-48 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-blue-100 rounded-full blur-[160px] opacity-40 -z-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="max-w-4xl mx-auto text-center space-y-10">
                <div className="inline-flex items-center space-x-3 bg-white border border-slate-200 p-2 rounded-full pr-6 shadow-sm">
                  <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">New</span>
                  <span className="text-sm font-bold text-slate-600">v2.5 Deterministic Legal Engine Now Live</span>
                </div>
                
                <h1 className="text-7xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                  THE COMPLIANCE <span className="text-blue-600">STANDARD</span> FOR TEAMS.
                </h1>
                
                <p className="text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                  Generate hyper-accurate Privacy Policies and Terms of Service using our local deterministic legal framework. No AI fluff. Just pure, legally-structured compliance.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
                  <button 
                    onClick={() => navigateTo('generator')}
                    className="bg-slate-900 text-white px-12 py-5 rounded-[24px] text-xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
                  >
                    Launch Generator
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Grid - Bento Style */}
          <section className="max-w-7xl mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div 
                  className="md:col-span-2 bg-white rounded-[40px] p-12 border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col justify-between group overflow-hidden"
                >
                   <div className="max-w-md">
                     <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                     </div>
                     <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight uppercase">Deterministic Engine</h2>
                     <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">
                       Unlike probabilistic models, our engine uses high-fidelity templates that guarantee structural integrity and legal consistency every single time.
                     </p>
                   </div>
                   <div className="flex items-center text-blue-600 font-black text-lg">
                      PRECISION COMPLIANCE
                   </div>
                </div>
                <div 
                  onClick={() => navigateTo('generator')}
                  className="bg-slate-900 rounded-[40px] p-12 text-white flex flex-col justify-between group cursor-pointer"
                >
                   <div>
                     <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                     </div>
                     <h2 className="text-4xl font-black mb-6 tracking-tight uppercase">Privacy First</h2>
                     <p className="text-slate-400 text-lg font-medium leading-relaxed">
                       Your data stays in your browser. Our local generation ensures no sensitive info ever hits our servers.
                     </p>
                   </div>
                   <div className="flex items-center text-white font-black text-lg mt-8 group-hover:translate-x-2 transition-transform">
                      START GENERATING &rarr;
                   </div>
                </div>
             </div>
          </section>

          {/* Expert Articles Section */}
          <section className="max-w-7xl mx-auto px-4">
             <div className="flex justify-between items-end mb-16">
                <div>
                   <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Legal Hub</h2>
                   <p className="text-xl text-slate-500 font-medium mt-2">Strategic insights for 2026 compliance.</p>
                </div>
                <button onClick={() => navigateTo('articles')} className="bg-slate-100 px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">All Articles</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {ARTICLES.slice(0, 4).map((article) => (
                  <div 
                    key={article.id} 
                    className="bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:border-blue-200 hover:-translate-y-2 transition-all cursor-pointer shadow-xl shadow-slate-200/30 flex flex-col"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="h-48 bg-slate-200">
                       <img src={`https://picsum.photos/seed/${article.id}/800/600`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt={article.title} />
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">{article.category}</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 leading-tight uppercase">{article.title}</h3>
                      <p className="text-slate-500 text-sm line-clamp-3 mb-8 font-medium">{article.excerpt}</p>
                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase text-slate-400">
                        <span>{article.readTime}</span>
                        <span className="text-blue-600">Read &rarr;</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </section>
        </div>
      )}

      {activeView === 'generator' && (
        <div className="bg-slate-50 py-16">
          <PolicyGenerator />
        </div>
      )}

      {activeView === 'articles' && (
        <div className="max-w-5xl mx-auto px-4 py-24">
          {selectedArticle ? (
            <div className="bg-white rounded-[48px] p-12 md:p-20 shadow-2xl shadow-slate-200/50 border border-slate-100 animate-in fade-in duration-500">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 font-black mb-12 flex items-center hover:text-slate-900 transition-colors uppercase text-xs tracking-widest"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Archive
              </button>
              <div className="mb-16">
                <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full font-black text-[10px] tracking-widest uppercase">{selectedArticle.category}</span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 mt-8 leading-[0.95] tracking-tighter uppercase">
                  {selectedArticle.title}
                </h1>
                <div className="flex items-center mt-12 text-slate-400 text-xs font-black uppercase tracking-widest">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mr-4">
                    {selectedArticle.author[0]}
                  </div>
                  <div>
                    <div className="text-slate-900">{selectedArticle.author}</div>
                    <div>{selectedArticle.readTime} • Archive 2026.04</div>
                  </div>
                </div>
              </div>
              <div className="prose prose-2xl prose-slate max-w-none text-slate-600 font-medium leading-relaxed whitespace-pre-wrap selection:bg-blue-100">
                {selectedArticle.content}
              </div>
            </div>
          ) : (
            <div className="space-y-16 animate-in slide-in-from-bottom duration-500">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase">Insights Archive</h2>
                <p className="text-xl text-slate-500 font-medium mt-4">Deep dives into global data laws and the future of digital compliance.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {ARTICLES.map((article) => (
                  <div 
                    key={article.id} 
                    className="group bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/20 hover:border-blue-200 transition-all cursor-pointer flex flex-col h-full"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="mb-8">
                       <span className="bg-slate-50 text-slate-400 px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest">{article.category}</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-[0.9] tracking-tighter uppercase">{article.title}</h3>
                    <p className="text-slate-500 text-lg font-medium mb-10 flex-grow">{article.excerpt}</p>
                    <div className="flex items-center text-slate-900 font-black text-xs uppercase tracking-widest">
                      Enter Archive <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default App;

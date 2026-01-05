
import React, { useState, useEffect, useMemo } from 'react';
import { GeneratorInputs, DocumentType, PlatformType, SavedDocument } from '../types';
import { generateLocalDocument } from '../services/legalService';

const STORAGE_KEY = 'ept_vault_v1';

const PolicyGenerator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<GeneratorInputs>({
    companyName: '',
    websiteUrl: '',
    appPlatform: 'iOS & Android',
    platform: 'Website',
    email: '',
    country: 'United States',
    state: '',
    collectsPersonalData: false,
    usesCookies: false,
    usesAds: false,
    thirdPartyTools: '',
    marketingEmails: false,
    sellData: false,
    socialLogins: false,
    paymentProcessing: false,
    minorUsers: false
  });

  const [docType, setDocType] = useState<DocumentType>(DocumentType.PRIVACY_POLICY);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [savedDocs, setSavedDocs] = useState<SavedDocument[]>([]);

  // Generate content in real-time
  const livePreview = useMemo(() => {
    return generateLocalDocument(docType, inputs);
  }, [docType, inputs]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedDocs(JSON.parse(stored));
      } catch (e) {
        console.error("Vault parsing error", e);
      }
    }
  }, []);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!inputs.companyName) newErrors.companyName = "Required";
      if (!inputs.websiteUrl) newErrors.websiteUrl = "Required";
    }
    if (currentStep === 2) {
      if (!inputs.email) newErrors.email = "Required";
      if (!inputs.country) newErrors.country = "Required";
    }
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => s - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setInputs(prev => ({ ...prev, [name]: val }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const u = { ...prev };
        delete u[name];
        return u;
      });
    }
  };

  const handleSave = () => {
    const newDoc: SavedDocument = {
      id: Date.now().toString(),
      type: docType,
      platform: inputs.platform,
      companyName: inputs.companyName,
      content: livePreview,
      date: new Date().toLocaleDateString(),
      inputs: { ...inputs }
    };
    const updated = [newDoc, ...savedDocs];
    setSavedDocs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    alert("Policy archived in your local vault.");
  };

  const deleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this archive permanently?")) {
      const updated = savedDocs.filter(d => d.id !== id);
      setSavedDocs(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const loadSaved = (doc: SavedDocument) => {
    setInputs(doc.inputs);
    setDocType(doc.type);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const downloadTxt = () => {
    if (step < 4) return;
    const element = document.createElement("a");
    const file = new Blob([livePreview], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${inputs.companyName.replace(/\s+/g, '_')}_${docType.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Core Identity</h3>
              <p className="text-slate-500 font-medium">First, define the entity being protected.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Company / Brand Name</label>
                <input 
                  name="companyName" 
                  value={inputs.companyName}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${fieldErrors.companyName ? 'border-red-500' : 'border-slate-200'} rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-semibold`} 
                  placeholder="Acme Digital"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">URL or App ID</label>
                <input 
                  name="websiteUrl" 
                  value={inputs.websiteUrl}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border ${fieldErrors.websiteUrl ? 'border-red-500' : 'border-slate-200'} rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-semibold`} 
                  placeholder="https://acme.com"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Document Framework</label>
              <div className="flex flex-wrap gap-3">
                {Object.values(DocumentType).map(t => (
                  <button 
                    key={t}
                    onClick={() => setDocType(t)}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all border-2 ${
                      docType === t ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Legal Jurisdiction</h3>
              <p className="text-slate-500 font-medium">Where is your primary operations hub?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Support Email</label>
                <input name="email" value={inputs.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-100 font-semibold" placeholder="legal@acme.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Country</label>
                <input name="country" value={inputs.country} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-100 font-semibold" placeholder="United States" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">State/Province</label>
                <input name="state" value={inputs.state} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-100 font-semibold" placeholder="California" />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Platform Deployment</label>
              <div className="grid grid-cols-3 gap-4">
                {['Website', 'App', 'Both'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setInputs(prev => ({...prev, platform: p as PlatformType}))}
                    className={`p-4 rounded-2xl font-bold border-2 transition-all ${
                      inputs.platform === p ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Data Governance</h3>
              <p className="text-slate-500 font-medium">Declare your tracking and collection habits.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: 'collectsPersonalData', label: 'We collect PII (Names, Emails)' },
                { id: 'usesCookies', label: 'We utilize HTTP Cookies' },
                { id: 'usesAds', label: 'We serve Targeted Advertising' },
                { id: 'marketingEmails', label: 'We send Marketing Newsletters' },
                { id: 'sellData', label: 'We may share/sell user data' },
                { id: 'socialLogins', label: 'We offer Social Media Logins' },
                { id: 'paymentProcessing', label: 'We process Financial Payments' },
                { id: 'minorUsers', label: 'Service targets users under 13' }
              ].map(item => (
                <label key={item.id} className="flex items-center space-x-3 p-4 bg-white border border-slate-100 rounded-2xl cursor-pointer hover:border-blue-200 transition-colors group">
                  <input 
                    type="checkbox" 
                    name={item.id} 
                    checked={(inputs as any)[item.id]} 
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded-lg text-blue-600 border-slate-300 focus:ring-blue-500" 
                  />
                  <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors text-xs">{item.label}</span>
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Integration Inventory (Stacks)</label>
              <textarea 
                name="thirdPartyTools" 
                value={inputs.thirdPartyTools}
                onChange={handleInputChange}
                rows={2} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-100 font-semibold text-sm" 
                placeholder="Google Analytics, Stripe, AWS, Sentry..."
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in zoom-in duration-500">
             <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 shadow-2xl shadow-blue-300 animate-bounce">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Generation Complete</h3>
              <p className="text-slate-500 max-w-sm mt-2 font-bold text-lg">Your deterministic legal framework is ready for deployment.</p>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Engine Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col h-full">
            <div className="p-10 flex-grow">
              {/* Stepper indicator */}
              <div className="flex space-x-2 mb-12">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className={`h-1.5 rounded-full flex-grow transition-all duration-500 ${step >= s ? 'bg-blue-600 w-full' : 'bg-slate-100 w-1/4'}`} />
                ))}
              </div>

              {renderStep()}
            </div>

            <div className="p-10 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              {step > 1 && step < 4 && (
                <button onClick={handleBack} className="text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase tracking-widest text-xs">Back</button>
              )}
              {step < 4 ? (
                <button 
                  onClick={handleNext} 
                  className="ml-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter"
                >
                  Continue &rarr;
                </button>
              ) : (
                <div className="w-full flex space-x-3">
                  <button onClick={() => setStep(1)} className="flex-grow bg-slate-100 text-slate-600 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all uppercase tracking-tighter text-sm">Start Over</button>
                  <button onClick={handleSave} className="flex-grow bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 uppercase tracking-tighter text-sm">Save to Vault</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 rounded-[40px] p-1 shadow-2xl h-full flex flex-col min-h-[700px] border border-slate-800">
            <div className="bg-slate-800/50 p-6 flex items-center justify-between border-b border-slate-700/50">
               <div className="flex space-x-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                 <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                 <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
               </div>
               <div className="flex space-x-4">
                 <button 
                  disabled={step < 4}
                  onClick={() => {
                    navigator.clipboard.writeText(livePreview);
                    alert("Copied to clipboard!");
                  }} 
                  className={`transition-colors flex items-center text-sm font-bold uppercase tracking-widest ${step < 4 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'}`}
                 >
                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                   Copy
                 </button>
                 <button 
                  disabled={step < 4}
                  onClick={downloadTxt} 
                  className={`transition-colors flex items-center text-sm font-bold uppercase tracking-widest ${step < 4 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'}`}
                 >
                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                   Export
                 </button>
               </div>
            </div>
            
            <div className="flex-grow p-10 overflow-y-auto custom-scrollbar bg-slate-900/50">
              {step === 4 ? (
                <div className="max-w-none prose prose-invert prose-blue font-serif leading-relaxed text-slate-300 animate-in fade-in duration-700">
                  <div className="whitespace-pre-wrap">{livePreview}</div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="p-8 rounded-full bg-slate-800/30 border border-slate-700/50">
                    <svg className="w-16 h-16 text-slate-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-500 uppercase tracking-tighter">Configuration in Progress</h4>
                    <p className="text-slate-600 mt-2 font-medium max-w-xs mx-auto text-sm">
                      Finish entering your requirements to reveal the final legal documentation.
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{animationDelay: '0ms'}} />
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{animationDelay: '150ms'}} />
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{animationDelay: '300ms'}} />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-blue-600 rounded-b-[38px] text-white flex items-center justify-between shadow-inner">
              <span className="text-sm font-black uppercase tracking-widest opacity-80">Deterministic Legal Engine v2.5</span>
              <div className="flex items-center text-xs font-black bg-white/20 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                SYSTEM READY
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vault Preview Section */}
      {savedDocs.length > 0 && (
        <div className="mt-24 space-y-12 animate-in fade-in duration-1000">
          <div className="flex items-center justify-between border-b border-slate-200 pb-8">
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Vault</h3>
            <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{savedDocs.length} Archives</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {savedDocs.map(doc => (
              <div 
                key={doc.id} 
                onClick={() => loadSaved(doc)}
                className="group bg-white p-8 rounded-[32px] border border-slate-100 hover:border-blue-200 shadow-xl shadow-slate-200/30 transition-all hover:-translate-y-2 cursor-pointer flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{doc.type}</div>
                  <button 
                    onClick={(e) => deleteSaved(doc.id, e)}
                    className="text-slate-200 hover:text-red-500 transition-colors p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{doc.companyName}</h4>
                <p className="text-slate-400 text-sm font-bold mb-8">Archived {doc.date}</p>
                <div className="mt-auto flex items-center text-blue-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Review &rarr;
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyGenerator;

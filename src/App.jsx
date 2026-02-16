import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ShieldAlert, 
  RefreshCw, 
  Briefcase, 
  Eye, 
  TrendingUp,
  Unlock,
  Users,
  Zap,
  MessageSquare,
  Hash,
  CheckCheck,
  Smartphone,
  Banknote,
  User,
  FileSearch,
  Siren,
  Terminal,
  Activity,
  Scale,
  BookOpen,
  AlertTriangle,
  Globe,
  Database
} from 'lucide-react';

const INITIAL_SCENARIOS = [
  {
    id: 1,
    context: "Scenario A: Source of Funds (SoF)",
    sentence: "The screenshot provided could not be verified as it lacks the sender's full details.",
    type: "The Strategic Passive",
    explanation: "Removes the agent (the analyst) from the rejection. Implies a systemic check failure per Bible Section 4.1.",
    logic: "Passive Voice: 'The document was not accepted' vs 'I rejected this'.",
    contextReason: "Mitigates conflict by removing personal agency. Legal shield against customer escalation.",
    ccq: ["Did 'I' reject it? (No)", "Is the document valid? (No)"],
    timelineData: { start: 0, end: 100, active: true },
    difficulty: "Advanced Analyst",
    visual: 'file',
    keywords: ["verified", "lacks", "sender's", "details", "provided"]
  },
  {
    id: 2,
    context: "Scenario B: Crypto Source of Wealth",
    sentence: "We need to verify the full audit trail including the initial fiat deposit and the trading ledger.",
    type: "The 'Complex' Chain",
    explanation: "A current balance is insufficient. We require the accumulation history to prove legitimacy (EAWL: Ledger).",
    logic: "Lexical precision using EAWL terms to project professional authority.",
    contextReason: "Establishes 'Economic Rationale'. Moves from simple checking to full forensic verification.",
    ccq: ["Is a screenshot enough? (No)", "What is needed? (Full audit trail)"],
    timelineData: { start: 0, end: 100, active: true, continuous: true },
    difficulty: "C1 Compliance Lead",
    visual: 'money',
    keywords: ["verify", "audit", "trail", "fiat", "deposit", "ledger"]
  },
  {
    id: 3,
    context: "Scenario C: Tipping Off Handling",
    sentence: "Your account has been restricted pending a standard security review.",
    type: "The 'Holding Pattern'",
    explanation: "Uses Present Perfect ('has been') to imply a changeable state. Legal shield against Section 333A POCA.",
    logic: "Nominalization: 'Standard security review' sounds static and non-negotiable.",
    contextReason: "Constructive ambiguity. Avoids 'Suspicious' (Red Zone) and uses 'Review' (Green Zone).",
    ccq: ["Are they banned? (No)", "Can we say why? (No)"],
    timelineData: { start: 50, end: 90, active: true, multiple: false },
    difficulty: "Critical Response",
    visual: 'shield',
    keywords: ["restricted", "pending", "standard", "security", "review"]
  },
  {
    id: 4,
    context: "Scenario D: Account Closure",
    sentence: "We regret to inform you that we can no longer offer you our services.",
    type: "The Declaration",
    explanation: "Finality. Shifts agency to 'Terms and Conditions' (Section 24). Non-negotiable offboarding.",
    logic: "Hard Stop: Using formal register to close the user-interaction loop permanently.",
    contextReason: "Used when risk appetite is exceeded. Decision is final and non-disclosable.",
    ccq: ["Can we negotiate? (No)", "Is this temporary? (No)"],
    timelineData: { start: 100, end: 100, active: true },
    difficulty: "Offboarding Specialist",
    visual: 'alert',
    keywords: ["regret", "inform", "services", "offer"]
  }
];

const NeuralAuditNet = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();
    
    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 0.5;
      nodes.forEach((n, i) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        
        ctx.fillStyle = '#00D2FF';
        ctx.globalAlpha = 0.4;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2); ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = n.x - nodes[j].x; const dy = n.y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = '#00D2FF';
            ctx.globalAlpha = (1 - dist / 150) * 0.2;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 bg-[#020202]" />;
};

const TimelineVisualizer = ({ data, active, visual }) => {
  const getIcon = () => {
    switch (visual) {
      case 'money': return <Banknote size={28} strokeWidth={2} />;
      case 'person': return <User size={28} strokeWidth={2} />;
      case 'alert': return <AlertTriangle size={28} strokeWidth={2} />;
      case 'file': return <FileSearch size={28} strokeWidth={2} />;
      case 'shield': return <ShieldAlert size={28} strokeWidth={2} />;
      default: return <Zap size={28} strokeWidth={2} />;
    }
  };

  return (
    <div className="relative w-full h-72 bg-[#050505] border border-white/10 my-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-center overflow-hidden rounded-2xl group">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="absolute top-6 left-8 text-lg font-black text-white uppercase tracking-[0.2em] z-20 flex items-center gap-3">
        <Database size={20} className="text-[#00D2FF]" /> Origin_Point
      </div>
      <div className="absolute top-6 right-8 text-lg font-black text-[#39FF14] uppercase tracking-[0.2em] z-20 flex items-center gap-3">
        Live_Status <div className="w-3 h-3 bg-[#39FF14] rounded-full animate-ping" />
      </div>

      <div className="absolute top-1/2 left-12 right-12 h-[2px] bg-white/10 flex items-center z-10">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-20 bg-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.5)]" /> 
        
        {active && (
          <div className="absolute h-full transition-all duration-1000 ease-out"
            style={{ left: `${data.start}%`, right: data.continuous ? '0%' : `${100 - data.end}%`, top: '-1px' }}>
            <div className={`absolute bottom-0 left-0 right-0 border-t-4 ${data.continuous ? 'border-[#39FF14] border-dashed shadow-[0_-10px_20px_rgba(57,255,20,0.1)]' : 'border-[#00D2FF] shadow-[0_-10px_20px_rgba(0,210,255,0.2)]'}`}
                 style={{ height: '60px', borderRadius: '100% 100% 0 0' }} />
            
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 p-5 rounded-2xl border-2 border-white/20 bg-[#0A0A0A] shadow-[0_20px_50px_rgba(0,0,0,1)] text-[#00D2FF] transition-all duration-300 group-hover:scale-110">
               {getIcon()}
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-6 w-full text-center z-20">
         <span className="text-sm font-black font-['Inter'] tracking-[0.4em] px-6 py-2 uppercase border border-white/5 bg-black/40 backdrop-blur-md rounded-full text-white/60">
            /// Audit Intelligence Link: <span className={active ? 'text-[#00D2FF]' : 'text-white/20'}>{active ? 'Verified' : 'Pending'}</span> ///
         </span>
      </div>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState('teacher'); 
  const [scenarios, setScenarios] = useState(INITIAL_SCENARIOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const currentScenario = scenarios[currentIndex];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00D2FF] selection:text-black pb-20">
      <NeuralAuditNet />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Inter:wght@400;700;900&family=Plus+Jakarta+Sans:wght@500;800&display=swap');
        .glass-dome {
          background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 30%), #0A0A0A;
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>

      <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10">
        <div className={`h-2 w-full transition-colors duration-500 ${mode === 'teacher' ? 'bg-[#00D2FF]' : 'bg-[#39FF14]'}`} />
        <div className="grid grid-cols-12 items-center px-10 py-6">
            <div className="col-span-4 flex items-center gap-6">
                <div className="w-16 h-16 glass-dome rounded-2xl flex items-center justify-center shadow-2xl relative group cursor-pointer">
                    <Scale className={`w-8 h-8 transition-colors ${mode === 'teacher' ? 'text-[#00D2FF]' : 'text-[#39FF14]'}`} />
                    <div className="absolute inset-[-4px] border border-white/5 rounded-2xl group-hover:border-[#00D2FF]/40 transition-colors" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-black text-white leading-none tracking-tighter uppercase font-['Plus_Jakarta_Sans']">
                        Revolut <span className={mode === 'teacher' ? 'text-[#00D2FF]' : 'text-[#39FF14]'}>AML_Audit</span>
                    </h1>
                    <span className="text-xs font-black font-['Inter'] uppercase tracking-widest text-white/30 mt-2 flex items-center gap-2">
                        <Activity size={12} className="animate-pulse text-[#39FF14]" /> System Sovereign
                    </span>
                </div>
            </div>
            <div className="col-span-4 flex justify-center">
                 <div className="flex items-end gap-1.5 h-8">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="w-0.5 bg-[#00D2FF]/40 rounded-full" style={{ height: `${Math.random() * 100}%`, minHeight: '4px' }} />
                    ))}
                 </div>
            </div>
            <div className="col-span-4 flex justify-end items-center gap-8">
                <div className="flex flex-col items-end">
                    <span className="text-base font-black font-['Inter'] text-white/70">{time} UTC</span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Network_Secure</span>
                </div>
                <div className="flex bg-[#000] p-1.5 rounded-xl border border-white/10 shadow-inner">
                    <button onClick={() => setMode('teacher')} className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase transition-all ${mode === 'teacher' ? 'bg-[#00D2FF] text-black shadow-2xl' : 'text-white/20 hover:text-white/40'}`}>Trainer</button>
                    <button onClick={() => setMode('student')} className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase transition-all ${mode === 'student' ? 'bg-[#39FF14] text-black shadow-2xl' : 'text-white/20 hover:text-white/40'}`}>Analyst</button>
                </div>
            </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-10 mt-16 flex flex-col gap-12">
        
        <div className="glass-dome rounded-[2rem] p-12 md:p-20 shadow-[0_100px_150px_-50px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="flex justify-between items-start mb-16">
              <div className="flex items-center gap-4">
                 <div className="w-3 h-12 bg-[#00D2FF] rounded-full shadow-[0_0_20px_rgba(0,210,255,0.4)]" />
                 <div>
                    <span className="text-[#00D2FF] text-sm font-black uppercase tracking-widest font-['Inter']">Operational Intercept</span>
                    <h4 className="text-xl font-bold text-white/40 font-['Plus_Jakarta_Sans']">{currentScenario.context}</h4>
                 </div>
              </div>
              <div className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black font-['Inter'] text-white/60 uppercase tracking-[0.3em]">
                {currentScenario.difficulty}
              </div>
            </div>

            <div className="min-h-[200px] flex items-center">
              <h2 className="text-4xl md:text-6xl leading-[1.2] text-white/50 font-['Plus_Jakarta_Sans'] font-medium select-none">
                "{currentScenario.sentence.split(' ').map((word, i) => {
                  const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
                  const isTarget = currentScenario.keywords?.includes(cleanWord);
                  return (
                    <span key={i} className={`inline-block mr-3 transition-all duration-300 ${isTarget ? "italic text-white/80 font-bold" : "text-white/40"}`}>
                      {word}
                    </span>
                  );
                })}"
              </h2>
            </div>

            <TimelineVisualizer data={currentScenario.timelineData} visual={currentScenario.visual} active={mode === 'teacher' || showAnswer} />

            <div className="mt-16">
              {!showAnswer && mode === 'student' ? (
                 <div className="flex justify-center">
                   <button onClick={() => setShowAnswer(true)}
                     className="px-20 py-8 rounded-2xl bg-white text-black font-black tracking-[0.4em] text-lg uppercase hover:scale-[1.02] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] transition-all duration-500 flex items-center gap-8 group">
                     <Eye size={28} strokeWidth={3} className="group-hover:rotate-12 transition-transform" /> Declassify Intel
                   </button>
                 </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex items-center gap-6 mb-12 border-b border-white/10 pb-10">
                    <div className="p-4 bg-[#39FF14]/10 rounded-2xl border border-[#39FF14]/20">
                        <TrendingUp className="text-[#39FF14]" size={40} />
                    </div>
                    <div>
                        <span className="block text-xs text-[#39FF14]/60 font-black uppercase tracking-[0.5em] mb-2">Protocol_Match</span>
                        <h3 className="text-5xl text-white font-['Playfair_Display'] font-black italic">{currentScenario.type}</h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[1.5rem] flex flex-col justify-between">
                        <span className="text-[#00D2FF] font-black font-['Inter'] uppercase tracking-widest text-xs mb-6 border-b border-[#00D2FF]/20 pb-4">Logic Matrix</span>
                        <p className="text-3xl text-white font-['Plus_Jakarta_Sans'] font-extrabold leading-tight tracking-tighter">{currentScenario.logic}</p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[1.5rem] flex flex-col justify-between">
                        <span className="text-[#39FF14] font-black font-['Inter'] uppercase tracking-widest text-xs mb-6 border-b border-[#39FF14]/20 pb-4">Compliance Environment</span>
                        <p className="text-xl text-white font-medium leading-relaxed">{currentScenario.contextReason}</p>
                    </div>
                  </div>

                  <div className="mt-10 p-10 rounded-[1.5rem] bg-[#39FF14]/5 border border-[#39FF14]/10 flex items-center gap-8">
                    <Zap className="text-[#39FF14] shrink-0" size={32} />
                    <p className="text-xl text-white/60 italic font-medium leading-relaxed">"{currentScenario.explanation}"</p>
                  </div>
                </div>
              )}
            </div>
        </div>

        {mode === 'teacher' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-10">
            <div className="glass-dome border-l-8 border-[#FF00FF] p-12 rounded-[2rem] shadow-2xl">
              <div className="flex items-center gap-6 mb-10">
                <Unlock size={32} className="text-[#FF00FF]" />
                <span className="text-sm font-black uppercase tracking-[0.4em] text-white/50">Concept Check Protocols</span>
              </div>
              <ul className="space-y-8">
                {currentScenario.ccq.map((q, i) => (
                  <li key={i} className="flex gap-8 text-2xl text-white font-['Playfair_Display'] font-black italic">
                    <span className="text-[#FF00FF]/40 font-black font-['Inter'] text-base mt-2">0{i+1}</span>
                    <span className="leading-tight">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-dome border border-white/10 p-12 rounded-[2rem] flex flex-col justify-center">
                 <span className="text-xs font-black text-white/20 uppercase tracking-[0.5em] mb-8">Pedagogical Anchor</span>
                 <p className="text-3xl text-white/40 italic leading-snug font-black uppercase tracking-tighter border-l-4 border-white/5 pl-10">
                   "PURGE RED ZONE LEXICON. ENFORCE PASSIVE BUFFERING."
                 </p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between pt-16 pb-24 border-t border-white/10 gap-12">
          <div className="flex gap-6">
            <button onClick={() => {setCurrentIndex(Math.max(0, currentIndex-1)); setShowAnswer(false);}} disabled={currentIndex === 0}
              className="px-14 py-7 glass-dome text-white/40 font-black hover:text-white hover:border-white transition-all text-xs uppercase tracking-widest rounded-2xl">
              Prev Case
            </button>
            <button onClick={() => {if(currentIndex < scenarios.length-1){setCurrentIndex(currentIndex+1); setShowAnswer(false);}}} disabled={currentIndex === scenarios.length - 1}
              className="px-14 py-7 glass-dome text-white/40 font-black hover:text-white hover:border-white transition-all text-xs uppercase tracking-widest rounded-2xl">
              Next Case
            </button>
          </div>
          
          <button onClick={() => setIsGenerating(true)} 
            className="px-16 py-7 font-black text-sm uppercase tracking-[0.5em] bg-[#39FF14]/10 text-[#39FF14] border-2 border-[#39FF14]/40 rounded-2xl hover:bg-[#39FF14] hover:text-black transition-all duration-500 flex gap-6 items-center shadow-[0_0_50px_rgba(57,255,20,0.2)]">
            {isGenerating ? <RefreshCw className="animate-spin" size={20}/> : <Globe size={20}/>}
            {isGenerating ? "Uplinking..." : "Inject Intelligence"}
          </button>
        </div>
      </main>
    </div>
  );
}

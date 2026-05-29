import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileCheck, AlertCircle, Loader2, Brain, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ResumeUpload() {
  const { user, updateUser } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [results, setResults] = useState<{ skills: string[]; gaps: string[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.name.endsWith('.pdf')) {
      setStatus('error');
      return;
    }
    setFile(f);
    setStatus('processing');

    // Simulate analysis delay
    setTimeout(() => {
      const roleSkills: Record<string, { skills: string[]; gaps: string[] }> = {
        'Frontend Engineer': {
          skills: ['React', 'JavaScript', 'CSS', 'HTML5', 'Git'],
          gaps: ['TypeScript', 'Performance Optimization', 'System Design', 'Testing (Jest/Cypress)'],
        },
        'Backend Engineer': {
          skills: ['Python', 'REST APIs', 'SQL', 'Git'],
          gaps: ['Distributed Systems', 'Caching (Redis)', 'Message Queues', 'Cloud (AWS/GCP)'],
        },
        'Data Scientist': {
          skills: ['Python', 'NumPy', 'Pandas', 'Data Visualization'],
          gaps: ['Deep Learning', 'MLOps', 'Feature Engineering', 'Model Deployment'],
        },
        'DevOps Engineer': {
          skills: ['Linux', 'Bash', 'Git', 'Docker'],
          gaps: ['Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Monitoring (Prometheus/Grafana)'],
        },
      };

      const role = user?.role ?? 'Software Engineer';
      const matched = Object.keys(roleSkills).find(k => role.includes(k.split(' ')[0]));
      const outcome = matched
        ? roleSkills[matched]
        : { skills: ['Python', 'Problem Solving', 'Git', 'Communication'], gaps: ['System Design', 'DSA Advanced', 'Cloud Platforms', 'Leadership'] };

      setResults(outcome);
      setStatus('done');
      updateUser({ resumeUploaded: true });
    }, 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setResults(null);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-6 py-10"
    >
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black tracking-tight mb-4">
          Resume <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Analysis</span>
        </h1>
        <p className="text-white/50 text-xl font-light max-w-xl">
          Upload your PDF and our AI will extract your skills, identify gaps specific to <strong className="text-white/80">{user?.role ?? 'your role'}</strong>, and refine your roadmap.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={`relative w-full glass-card rounded-[3rem] p-16 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-500 ${isHovered ? 'border-indigo-500/60 shadow-[0_0_60px_rgba(99,102,241,0.2)]' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            <motion.div animate={{ y: isHovered ? -12 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative z-10 p-6 bg-white/5 rounded-full mb-8 border border-white/10">
              <UploadCloud size={64} className={`transition-colors duration-300 ${isHovered ? 'text-indigo-400' : 'text-white/40'}`} />
            </motion.div>
            <h3 className="relative z-10 text-3xl font-bold mb-3">Drag & drop your PDF</h3>
            <p className="relative z-10 text-white/40 mb-10 text-lg">or click to browse</p>
            <button className="relative z-10 px-10 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform text-lg">
              Select Resume
            </button>
            <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          </motion.div>
        )}

        {status === 'processing' && (
          <motion.div key="processing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="w-full glass-card rounded-[3rem] p-16 flex flex-col items-center text-center"
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Loader2 size={48} className="animate-spin text-indigo-400" />
              </div>
              <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/10" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Analyzing {file?.name}</h3>
            <p className="text-white/40 text-lg">AI agents are extracting skills and comparing them against <strong className="text-white/60">{user?.role}</strong> requirements...</p>
            <div className="mt-8 space-y-2 w-full max-w-xs">
              {['Parsing PDF...', 'Extracting skills...', 'Benchmarking against role...', 'Generating insights...'].map((msg, i) => (
                <motion.div key={msg} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.6 }}
                  className="flex items-center gap-3 text-sm text-white/40 text-left">
                  <Brain size={14} className="text-indigo-400 shrink-0" /> {msg}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {status === 'done' && results && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-emerald-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
                  <FileCheck size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Analysis Complete</h3>
                  <p className="text-white/40">{file?.name}</p>
                </div>
                <button onClick={reset} className="ml-auto p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-4">✓ Detected Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.skills.map(s => (
                      <span key={s} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl text-sm font-semibold">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-4">⚠ Gaps to Address</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.gaps.map(g => (
                      <span key={g} className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl text-sm font-semibold">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-6 text-white/30 text-sm">
                ✦ Your roadmap has been updated to prioritize these gap areas. Head to <strong className="text-indigo-400">My Roadmap</strong> to see the refined plan.
              </p>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full glass-card rounded-3xl p-10 flex flex-col items-center text-center border border-red-500/20">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Invalid File</h3>
            <p className="text-white/40 mb-8">Only PDF files are supported. Please select a valid resume PDF.</p>
            <button onClick={reset} className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform">Try Again</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Brain, Map, Video, BarChart3, Code2, Github, Star, Zap, Shield, ChevronDown } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import { TiltCard } from '../components/ui/TiltCard';

const floatingOrbs = [
  { size: 600, top: '-20%', left: '-10%', color: 'from-indigo-600/20 to-violet-600/20', delay: 0 },
  { size: 400, top: '40%', right: '-5%', color: 'from-fuchsia-600/20 to-pink-600/20', delay: 2 },
  { size: 300, bottom: '-10%', left: '30%', color: 'from-sky-600/20 to-cyan-600/20', delay: 4 },
];

const features = [
  { icon: Brain, title: 'Resume Intelligence', desc: 'Upload your PDF and let AI extract your skills, spot gaps, and benchmark you against your target role — in seconds.', color: 'from-indigo-500 to-violet-500', glow: 'rgba(99,102,241,0.3)' },
  { icon: Map, title: 'Personalized Roadmap', desc: 'Receive a dynamic, day-by-day study plan tailored exactly to your weak areas — covering DSA, System Design, and HR prep.', color: 'from-fuchsia-500 to-pink-500', glow: 'rgba(217,70,239,0.3)' },
  { icon: Video, title: 'Mock Interview Agent', desc: 'Face an adaptive AI interviewer that adjusts difficulty in real-time, asks follow-ups, and evaluates every response.', color: 'from-sky-500 to-cyan-500', glow: 'rgba(14,165,233,0.3)' },
  { icon: BarChart3, title: 'Progress Analytics', desc: 'Track your score trends, session history, and improvement rate across every interview session on a beautiful dashboard.', color: 'from-emerald-500 to-teal-500', glow: 'rgba(16,185,129,0.3)' },
  { icon: Code2, title: 'Coding Challenges', desc: 'Targeted algorithm questions generated based on your weak spots — from arrays to dynamic programming.', color: 'from-amber-500 to-orange-500', glow: 'rgba(245,158,11,0.3)' },
  { icon: Github, title: 'GitHub Analyzer', desc: 'Connect your GitHub profile and let the AI analyze your contributions, extract your stack, and factor it into interview prep.', color: 'from-rose-500 to-red-500', glow: 'rgba(244,63,94,0.3)' },
];

const stats = [
  { number: '5+', label: 'Specialized AI Agents' },
  { number: '3', label: 'Interview Formats' },
  { number: '100%', label: 'Personalized Content' },
  { number: '∞', label: 'Practice Sessions' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 50, damping: 20 });
  
  const heroY = useTransform(smoothScrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(smoothScrollY, [0, 400], [1, 0]);

  const titleWords = "Your AI Placement Mentor".split(" ");

  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-x-hidden">
      {/* Animated mesh background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {floatingOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              bottom: orb.bottom,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 8, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center px-8 md:px-16 py-6">
        <MagneticButton>
          <div className="flex items-center gap-3 cursor-hover">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              <Sparkles size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">PrepMind.ai</span>
          </div>
        </MagneticButton>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="px-6 py-2.5 text-white/70 hover:text-white font-medium transition-colors text-sm cursor-hover">Sign In</button>
          <MagneticButton onClick={() => navigate('/signup')} className="px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all text-sm hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-hover">Get Started Free</MagneticButton>
        </div>
      </nav>

      {/* Hero */}
      <motion.section style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 pt-20 pb-32 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8 cursor-hover">
          <Zap size={14} className="text-yellow-400" />
          Powered by LangGraph Multi-Agent AI
          <Star size={14} className="text-yellow-400" />
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-8">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
              className={`inline-block mr-4 ${i >= 2 ? 'bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent block mt-2' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          PrepMind analyzes your resume, builds a personalized study roadmap, and puts you through realistic AI mock interviews — adapting to you every step of the way.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton onClick={() => navigate('/signup')} className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(99,102,241,0.4)] text-lg cursor-hover">
            Start Preparing Free
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <MagneticButton onClick={() => navigate('/login')} className="flex items-center gap-3 px-10 py-5 glass-card text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg cursor-hover">
            I already have an account
          </MagneticButton>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-20 flex justify-center cursor-hover">
          <ChevronDown size={28} className="text-white/20" />
        </motion.div>
      </motion.section>

      {/* Stats */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02] py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center cursor-hover">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">{s.number}</div>
              <div className="text-white/50 font-medium text-sm uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20 cursor-hover">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Everything you need to
            <span className="block bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">land your dream job</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto font-light">Six specialized AI agents work together, each playing a distinct role in your preparation journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
              className="h-full"
            >
              <TiltCard className="glass-card p-10 h-full cursor-hover flex flex-col items-start justify-start group">
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-[0_0_30px_${feature.glow}] group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon size={30} className="text-white" />
                </div>
                <h3 className="relative z-10 text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="relative z-10 text-white/50 leading-relaxed text-lg">{feature.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-[3rem] p-16 text-center relative overflow-hidden cursor-hover">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-transparent rounded-[3rem]" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl" />
          <Shield size={48} className="text-indigo-400 mx-auto mb-6 relative z-10" />
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 relative z-10">Ready to ace your interviews?</h2>
          <p className="text-white/50 text-xl mb-10 font-light relative z-10">Create your free account and let your AI mentor get to work.</p>
          <MagneticButton onClick={() => navigate('/signup')}
            className="relative z-10 group inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all text-xl shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Create Free Account
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </motion.div>
      </section>

      <footer className="relative z-10 text-center py-10 text-white/20 text-sm border-t border-white/5 cursor-hover">
        © 2026 PrepMind AI · Built with LangGraph, FastAPI & React
      </footer>
    </div>
  );
}

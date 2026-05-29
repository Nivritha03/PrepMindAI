import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, ArrowRight, Brain, Upload, BookOpen, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 22 } }
};

const quickActions = [
  { icon: Upload, label: 'Upload Resume', desc: 'Analyze your profile', path: '/upload', color: 'from-indigo-500 to-violet-500', glow: 'rgba(99,102,241,0.3)' },
  { icon: BookOpen, label: 'View Roadmap', desc: 'Check your study plan', path: '/roadmap', color: 'from-fuchsia-500 to-pink-500', glow: 'rgba(217,70,239,0.3)' },
  { icon: MessageSquare, label: 'Mock Interview', desc: 'Practice with AI', path: '/interview', color: 'from-sky-500 to-cyan-500', glow: 'rgba(14,165,233,0.3)' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.name.split(' ')[0] ?? 'there';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto p-8 md:p-12 space-y-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <p className="text-white/40 font-medium uppercase tracking-widest text-xs mb-2">{greeting()}</p>
        <h1 className="text-5xl font-black tracking-tight mb-3">
          {firstName} <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">👋</span>
        </h1>
        <p className="text-white/50 text-xl font-light">
          Preparing for <span className="text-white font-semibold">{user?.role ?? 'your role'}</span> · 
          <span className="text-white/40"> {user?.experience ?? ''}</span>
        </p>
      </motion.div>

      {/* Resume not uploaded nudge */}
      {!user?.resumeUploaded && (
        <motion.div variants={itemVariants}
          className="relative overflow-hidden glass-card p-6 rounded-3xl border border-indigo-500/30 cursor-pointer group"
          onClick={() => navigate('/upload')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 group-hover:from-indigo-500/20 group-hover:to-fuchsia-500/20 transition-all duration-300 rounded-3xl" />
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-indigo-500/20 text-indigo-300 rounded-2xl">
              <Brain size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Upload your resume to get started</h3>
              <p className="text-white/50">Our AI will analyze your profile and build your personalized plan.</p>
            </div>
            <ArrowRight size={24} className="text-indigo-400 group-hover:translate-x-2 transition-transform" />
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Trophy, label: 'Avg Score', value: user?.resumeUploaded ? '—' : 'No sessions yet', sub: 'Complete an interview to track', color: 'indigo', glow: 'rgba(99,102,241,0.2)' },
          { icon: Target, label: 'Interviews', value: '0', sub: 'Start your first session', color: 'fuchsia', glow: 'rgba(217,70,239,0.2)' },
          { icon: TrendingUp, label: 'Focus Area', value: user?.role?.split(' ')[0] ?? '—', sub: user?.experience ?? 'Set your experience level', color: 'emerald', glow: 'rgba(16,185,129,0.2)' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl flex items-center gap-5 relative overflow-hidden group">
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-${stat.color}-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500`} />
            <div className={`p-4 bg-${stat.color}-500/20 text-${stat.color}-300 rounded-2xl shadow-[0_0_15px_${stat.glow}] shrink-0`}>
              <stat.icon size={32} />
            </div>
            <div className="overflow-hidden">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
              <h2 className="text-3xl font-black truncate">{stat.value}</h2>
              <p className="text-white/30 text-xs mt-1">{stat.sub}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickActions.map((action, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
              className="glass-card p-6 rounded-3xl cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${action.glow} 0%, transparent 70%)` }} />
              <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg`}>
                <action.icon size={22} className="text-white" />
              </div>
              <h3 className="relative z-10 font-bold text-lg mb-1">{action.label}</h3>
              <p className="relative z-10 text-white/50 text-sm">{action.desc}</p>
              <ArrowRight size={18} className="absolute bottom-6 right-6 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Sessions — empty state */}
      <motion.div variants={itemVariants} className="glass-card p-10 rounded-3xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Interview History</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-6 bg-white/5 rounded-full mb-5">
            <MessageSquare size={40} className="text-white/20" />
          </div>
          <h3 className="text-xl font-bold text-white/40 mb-2">No sessions yet</h3>
          <p className="text-white/30 mb-8 max-w-sm">
            Once you complete your first mock interview, your session history and scores will appear here.
          </p>
          <button
            onClick={() => navigate('/interview')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            Start First Interview
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

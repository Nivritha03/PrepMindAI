import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, User, Mail, Lock, Briefcase, BarChart2, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roles = ['Software Engineer', 'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer', 'Data Scientist', 'ML Engineer', 'DevOps Engineer', 'Product Manager'];
const experienceLevels = ['Fresher (0 years)', 'Junior (1-2 years)', 'Mid-level (3-5 years)', 'Senior (5+ years)'];

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '', experience: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role || !form.experience) { setError('Please select your target role and experience level.'); return; }
    setError('');
    setLoading(true);
    const ok = await signup(form.name, form.email, form.password, form.role, form.experience);
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setError('An account with this email already exists. Try signing in.');
  };

  const inputClass = "w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-white/20 text-lg";
  const selectClass = "w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none";

  return (
    <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Sparkles size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">PrepMind.ai</span>
          </Link>
          <h1 className="text-4xl font-black tracking-tight mb-3">Create your account</h1>
          <p className="text-white/50 text-lg">Tell us about yourself so we can personalize everything.</p>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-6 text-red-400 text-sm">
              <AlertCircle size={18} className="shrink-0" /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2 block">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} required
                  placeholder="Your full name" className={inputClass} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2 block">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required
                  placeholder="you@example.com" className={inputClass} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={form.password} onChange={e => update('password', e.target.value)} required
                  placeholder="Create a password" className={inputClass} />
              </div>
            </div>

            {/* Target Role */}
            <div>
              <label className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2 block">Target Role</label>
              <div className="relative">
                <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 z-10" />
                <select value={form.role} onChange={e => update('role', e.target.value)} className={selectClass}>
                  <option value="" className="bg-[#030014]">Select your target role...</option>
                  {roles.map(r => <option key={r} value={r} className="bg-[#030014]">{r}</option>)}
                </select>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2 block">Experience Level</label>
              <div className="relative">
                <BarChart2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 z-10" />
                <select value={form.experience} onChange={e => update('experience', e.target.value)} className={selectClass}>
                  <option value="" className="bg-[#030014]">Select your experience...</option>
                  {experienceLevels.map(l => <option key={l} value={l} className="bg-[#030014]">{l}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full group flex items-center justify-center gap-3 py-5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold rounded-2xl hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 transition-all text-lg shadow-[0_0_30px_rgba(99,102,241,0.3)] mt-2">
              {loading ? 'Creating account...' : (<>Start Preparing Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>)}
            </button>
          </form>

          <p className="text-center text-white/40 mt-8 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign in →</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

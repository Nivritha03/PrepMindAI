import { motion } from 'framer-motion';
import { CheckCircle, Circle, Map as MapIcon, ChevronRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Roadmap() {
  const { user } = useAuth();

  const role = user?.role ?? 'Software Engineer';
  const exp = user?.experience ?? 'Fresher (0 years)';

  // Derive focus based on role
  const isFrontend = role.toLowerCase().includes('frontend');
  const isBackend = role.toLowerCase().includes('backend');
  const isData = role.toLowerCase().includes('data') || role.toLowerCase().includes('ml');
  const isDevOps = role.toLowerCase().includes('devops');

  const steps = isData
    ? [
        { title: 'Python & Statistics Fundamentals', detail: 'NumPy, Pandas, probability, statistics basics', deadline: 'Week 1', status: 'active' },
        { title: 'Machine Learning Core Concepts', detail: 'Supervised/unsupervised learning, model evaluation', deadline: 'Week 2–3', status: 'pending' },
        { title: 'Deep Learning & Frameworks', detail: 'PyTorch or TensorFlow basics, CNNs, transformers', deadline: 'Week 4–5', status: 'pending' },
        { title: 'ML System Design', detail: 'Feature stores, model serving, data pipelines', deadline: 'Week 6', status: 'pending' },
        { title: 'Case Studies & Mock Interviews', detail: 'Real ML interview problems and behavioral prep', deadline: 'Week 7–8', status: 'pending' },
      ]
    : isDevOps
    ? [
        { title: 'Linux, Networking & Bash Scripting', detail: 'Core OS, TCP/IP, shell scripting', deadline: 'Week 1', status: 'active' },
        { title: 'Docker & Kubernetes', detail: 'Containers, orchestration, Helm charts', deadline: 'Week 2–3', status: 'pending' },
        { title: 'CI/CD Pipelines', detail: 'GitHub Actions, Jenkins, ArgoCD patterns', deadline: 'Week 4', status: 'pending' },
        { title: 'Cloud Platforms (AWS/GCP)', detail: 'Core services, IaC with Terraform', deadline: 'Week 5–6', status: 'pending' },
        { title: 'System Design & Mock Interviews', detail: 'Reliability, scalability, on-call processes', deadline: 'Week 7–8', status: 'pending' },
      ]
    : isFrontend
    ? [
        { title: 'JavaScript & TypeScript Deep Dive', detail: 'Closures, async/await, type system', deadline: 'Week 1', status: 'active' },
        { title: 'React & State Management', detail: 'Hooks, Context, Redux/Zustand', deadline: 'Week 2–3', status: 'pending' },
        { title: 'Performance & Web Fundamentals', detail: 'Browser rendering, Core Web Vitals, caching', deadline: 'Week 4', status: 'pending' },
        { title: 'DSA & Problem Solving', detail: 'Arrays, trees, graphs — LeetCode medium level', deadline: 'Week 5–6', status: 'pending' },
        { title: 'System Design & Mock Interviews', detail: 'Frontend architecture, APIs, behavioral prep', deadline: 'Week 7–8', status: 'pending' },
      ]
    : isBackend
    ? [
        { title: 'Core Language & Runtime Internals', detail: 'Memory model, concurrency, async patterns', deadline: 'Week 1', status: 'active' },
        { title: 'Databases & Query Optimization', detail: 'SQL, indexing, query plans, NoSQL trade-offs', deadline: 'Week 2–3', status: 'pending' },
        { title: 'API Design & Microservices', detail: 'REST, gRPC, messaging, service mesh basics', deadline: 'Week 4', status: 'pending' },
        { title: 'DSA & Problem Solving', detail: 'Arrays, trees, graphs — LeetCode medium/hard', deadline: 'Week 5–6', status: 'pending' },
        { title: 'System Design & Mock Interviews', detail: 'Distributed systems, CAP theorem, behavioral prep', deadline: 'Week 7–8', status: 'pending' },
      ]
    : [
        { title: 'DSA Foundations', detail: `Arrays, linked lists, hash maps, sorting — targeting ${role}`, deadline: 'Week 1–2', status: 'active' },
        { title: 'Advanced DSA & Patterns', detail: 'Trees, graphs, DP, sliding window', deadline: 'Week 3–4', status: 'pending' },
        { title: 'System Design', detail: 'HLD & LLD — scalability, databases, caching', deadline: 'Week 5–6', status: 'pending' },
        { title: 'Behavioral & HR Prep', detail: 'STAR method, leadership stories, conflict resolution', deadline: 'Week 7', status: 'pending' },
        { title: 'Full Mock Interviews', detail: 'End-to-end practice sessions targeting your level', deadline: 'Week 8', status: 'pending' },
      ];

  const colorMap: Record<string, { bg: string; text: string; glow: string; border: string }> = {
    done: { bg: 'bg-emerald-500', text: 'text-emerald-400', glow: 'shadow-[0_0_16px_rgba(16,185,129,0.5)]', border: 'border-emerald-500/30' },
    active: { bg: 'bg-fuchsia-500', text: 'text-fuchsia-400', glow: 'shadow-[0_0_16px_rgba(217,70,239,0.6)]', border: 'border-fuchsia-500/30' },
    pending: { bg: 'bg-white/10', text: 'text-white/30', glow: '', border: 'border-white/5' },
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-10 px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex items-center gap-6 mb-12 glass-card p-8 rounded-3xl"
      >
        <div className="p-5 bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.4)] shrink-0">
          <MapIcon size={44} />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-1">Your Masterplan</h1>
          <p className="text-white/50 text-lg">
            Personalized for <span className="text-white font-semibold">{role}</span> · 
            <span className="text-white/40"> {exp}</span>
          </p>
          {!user?.resumeUploaded && (
            <p className="text-amber-400/70 text-sm mt-2">
              ✦ Upload your resume to have this roadmap further refined to your specific gaps.
            </p>
          )}
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative border-l-2 border-white/10 ml-8 space-y-8 pb-8">
        {steps.map((step, idx) => {
          const c = colorMap[step.status];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + idx * 0.1, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              {/* Dot */}
              <div className={`absolute -left-[45px] top-5 p-2 rounded-full ${c.bg} ${c.glow} border-4 border-[#030014]`}>
                {step.status === 'done'
                  ? <CheckCircle size={14} className="text-white" />
                  : step.status === 'active'
                  ? <Circle size={14} className="text-white animate-pulse" />
                  : <Lock size={14} className="text-white/40" />
                }
              </div>

              <div className={`ml-10 glass-card p-6 rounded-2xl relative overflow-hidden group cursor-default border ${c.border} ${step.status === 'pending' ? 'opacity-60' : ''}`}>
                {/* Left color bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${c.bg}`} />

                {step.status === 'active' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-transparent pointer-events-none rounded-2xl" />
                )}

                <div className="pl-2 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      {step.status === 'active' && (
                        <span className="text-xs font-black uppercase tracking-widest text-fuchsia-400 bg-fuchsia-500/10 px-2.5 py-0.5 rounded-full border border-fuchsia-500/30">
                          In Progress
                        </span>
                      )}
                      {step.status === 'done' && (
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold tracking-tight mb-1 ${step.status === 'active' ? 'text-white' : step.status === 'done' ? 'text-emerald-300' : 'text-white/60'}`}>
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-sm">{step.detail}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{step.deadline}</p>
                    <ChevronRight size={20} className="text-white/10 group-hover:text-white/30 group-hover:translate-x-1 transition-all mt-2 ml-auto" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

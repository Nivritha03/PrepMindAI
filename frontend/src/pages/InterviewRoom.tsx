import { motion } from 'framer-motion';
import { Send, User, Sparkles, Loader2, Video, Mic } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Message {
  role: 'agent' | 'user';
  text: string;
}

const openingQuestion = (role: string) =>
  `Hello! I'm your PrepMind AI Interviewer. I can see you're targeting a **${role}** position. Let's begin!\n\nFirst question: Can you walk me through your background and what specifically draws you to this role?`;

export default function InterviewRoom() {
  const { user } = useAuth();
  const role = user?.role ?? 'Software Engineer';

  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', text: openingQuestion(role) }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const agentResponses = [
    `Good answer! I appreciated that you highlighted your hands-on experience. Now, since you're targeting **${role}**, let's go deeper:\n\nCan you explain the difference between horizontal and vertical scaling, and when you'd choose each?`,
    `Solid explanation. Score: **8/10** — you covered the core concept well but missed mentioning trade-offs in cost.\n\nNext: Design a URL shortener service. Walk me through the high-level architecture.`,
    `Very good thinking on the architecture! Score: **9/10** — excellent coverage of the core components.\n\nFinal question: Describe a challenging technical problem you solved and how you approached it.`,
    `Excellent session! 🎉\n\n**Session Summary:**\n- Overall Score: **8.7 / 10**\n- Strength: System design intuition\n- Improve: Add more concrete metrics and trade-offs\n\nGreat work! Check your roadmap for recommended follow-up topics.`
  ];
  const [responseIdx, setResponseIdx] = useState(0);

  const handleSend = () => {
    if (!input.trim() || isThinking) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, {
        role: 'agent',
        text: agentResponses[responseIdx % agentResponses.length]
      }]);
      setResponseIdx(prev => prev + 1);
    }, 1800);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto h-full flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between items-center glass-card p-5 rounded-t-3xl border-b-0 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Video size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">Interview Room</h2>
            <p className="text-white/40 text-sm">Technical · {role}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center glass-panel px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Agent Active</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 glass-card rounded-none p-6 overflow-y-auto space-y-6 relative min-h-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className={`flex gap-4 relative z-10 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`p-3 rounded-2xl flex items-center justify-center shrink-0 w-12 h-12 ${
              m.role === 'user'
                ? 'bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white shadow-lg'
                : 'bg-white/10 text-white border border-white/10'
            }`}>
              {m.role === 'user'
                ? <User size={20} />
                : <Sparkles size={20} />
              }
            </div>
            <div className={`max-w-[75%] p-5 text-base leading-relaxed whitespace-pre-line ${
              m.role === 'user'
                ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-3xl rounded-tr-sm border border-indigo-400/20'
                : 'bg-white/5 text-white/90 rounded-3xl rounded-tl-sm backdrop-blur-md border border-white/10'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {isThinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="p-3 w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-400" size={20} />
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl rounded-tl-sm flex items-center gap-3">
              <span className="text-white/40 text-sm italic">Agent is evaluating your response...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="glass-card p-5 rounded-b-3xl border-t-0 z-10 flex gap-3 items-center shrink-0">
        <button
          type="button"
          onClick={() => setIsRecording(v => !v)}
          className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording
              ? 'bg-fuchsia-500 text-white animate-pulse shadow-[0_0_20px_rgba(217,70,239,0.5)]'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
        >
          <Mic size={24} />
        </button>
        <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-3 flex-1">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your answer or use the mic..."
            className="flex-1 bg-white/5 border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-white/25 text-base backdrop-blur-md"
          />
          <button
            type="submit"
            disabled={isThinking}
            className="shrink-0 w-14 h-14 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white rounded-2xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

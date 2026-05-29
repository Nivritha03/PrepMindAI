import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileUp, MessageSquare, Map, Sparkles, LogOut, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Resume Analysis', path: '/upload', icon: FileUp },
    { name: 'My Roadmap', path: '/roadmap', icon: Map },
    { name: 'Interview Room', path: '/interview', icon: MessageSquare },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="mesh-bg" />
      <div className="flex h-screen text-white overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-72 glass-panel border-r border-white/5 flex flex-col z-10 m-4 rounded-3xl shrink-0"
        >
          {/* Logo */}
          <div className="p-7 pb-4 flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Sparkles size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-black bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent tracking-tight">
              PrepMind.ai
            </h1>
          </div>

          {/* Role badge */}
          {user?.role && (
            <div className="mx-5 mb-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <p className="text-indigo-300 text-xs font-semibold uppercase tracking-widest truncate">{user.role}</p>
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 px-4 space-y-1 mt-4">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path} className="block relative group">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-2xl border border-white/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                  }`}>
                    <item.icon size={20} className={isActive ? 'text-indigo-400' : ''} />
                    <span className="font-semibold tracking-wide text-sm">{item.name}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto text-indigo-400/60" />}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User profile */}
          <div className="p-4 m-3 mt-0 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center font-black text-sm shadow-lg shrink-0">
                {user?.avatarInitials ?? '?'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate text-white">{user?.name ?? 'User'}</p>
                <p className="text-xs text-white/30 truncate">{user?.experience ?? ''}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-semibold"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </motion.aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 pl-0 min-w-0">
          <div className="glass-panel h-full w-full rounded-3xl overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

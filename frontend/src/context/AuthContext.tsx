import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
const API_BASE = `${BACKEND_URL}/api/auth`;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  experience: string;
  resumeUploaded: boolean;
  avatarInitials: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: string, experience: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('prepmind_user');
    const storedToken = localStorage.getItem('prepmind_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      const mappedUser: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.target_role ?? '',
        experience: data.user.experience_level ?? '',
        resumeUploaded: data.user.resumeUploaded ?? false,
        avatarInitials: data.user.avatarInitials ?? '',
      };
      setUser(mappedUser);
      setToken(data.token);
      localStorage.setItem('prepmind_user', JSON.stringify(mappedUser));
      localStorage.setItem('prepmind_token', data.token);
      return true;
    } catch {
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: string,
    experience: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, target_role: role, experience_level: experience }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      const mappedUser: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.target_role ?? role,
        experience: data.user.experience_level ?? experience,
        resumeUploaded: data.user.resumeUploaded ?? false,
        avatarInitials: data.user.avatarInitials ?? name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
      };
      setUser(mappedUser);
      setToken(data.token);
      localStorage.setItem('prepmind_user', JSON.stringify(mappedUser));
      localStorage.setItem('prepmind_token', data.token);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('prepmind_user');
    localStorage.removeItem('prepmind_token');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('prepmind_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

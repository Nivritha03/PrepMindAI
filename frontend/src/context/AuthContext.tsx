import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string; // target role e.g. "Software Engineer"
  experience: string; // "Fresher" | "Junior" | "Mid" | "Senior"
  resumeUploaded: boolean;
  avatarInitials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: string, experience: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('prepmind_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    const stored = localStorage.getItem('prepmind_users');
    if (!stored) return false;
    const users: User[] = JSON.parse(stored);
    const found = users.find(u => u.email === email);
    if (!found) return false;
    setUser(found);
    localStorage.setItem('prepmind_user', JSON.stringify(found));
    return true;
  };

  const signup = async (name: string, email: string, _password: string, role: string, experience: string): Promise<boolean> => {
    const stored = localStorage.getItem('prepmind_users');
    const users: User[] = stored ? JSON.parse(stored) : [];
    if (users.find(u => u.email === email)) return false; // already exists
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      experience,
      resumeUploaded: false,
      avatarInitials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    };
    
    users.push(newUser);
    localStorage.setItem('prepmind_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('prepmind_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prepmind_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('prepmind_user', JSON.stringify(updated));
    // also update in users list
    const stored = localStorage.getItem('prepmind_users');
    if (stored) {
      const users: User[] = JSON.parse(stored);
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) {
        users[idx] = updated;
        localStorage.setItem('prepmind_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

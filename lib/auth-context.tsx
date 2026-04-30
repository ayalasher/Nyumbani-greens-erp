'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'operator';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'demo@nyumbani.com': {
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@nyumbani.com',
      name: 'Demo Admin',
      role: 'admin',
    },
  },
  'manager@nyumbani.com': {
    password: 'manager123',
    user: {
      id: '2',
      email: 'manager@nyumbani.com',
      name: 'John Manager',
      role: 'manager',
    },
  },
  'operator@nyumbani.com': {
    password: 'operator123',
    user: {
      id: '3',
      email: 'operator@nyumbani.com',
      name: 'Sarah Operator',
      role: 'operator',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const demoUser = DEMO_USERS[email];
    
    if (!demoUser || demoUser.password !== password) {
      throw new Error('Invalid email or password');
    }

    setUser(demoUser.user);
    localStorage.setItem('auth_user', JSON.stringify(demoUser.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

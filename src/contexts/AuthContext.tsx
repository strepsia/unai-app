import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, DbUser } from '@/lib/supabase';

interface User {
  id: string;
  username: string;
  email: string;
  tokens: number;
  avatar: any;
  competitions: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const savedUserId = localStorage.getItem('unai_user_id');
      if (savedUserId) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', savedUserId)
          .single();
        
        if (data) {
          setUser({
            id: data.id,
            username: data.username,
            email: data.email,
            tokens: data.tokens || 0,
            avatar: data.avatar,
            competitions: data.competitions || ['f1'],
          });
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password_hash', password)
      .single();

    if (error || !data) {
      return { success: false, error: 'Usuario o contraseña incorrectos' };
    }

    const userData: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      tokens: data.tokens || 0,
      avatar: data.avatar,
      competitions: data.competitions || ['f1'],
    };

    setUser(userData);
    localStorage.setItem('unai_user_id', data.id);
    return { success: true };
  };

  const register = async (username: string, email: string, password: string) => {
    // Check if user exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existing) {
      return { success: false, error: 'El usuario ya existe' };
    }

    // Create new user
    const { data, error } = await supabase
      .from('users')
      .insert({
        username,
        email,
        password_hash: password,
        tokens: 100,
        competitions: ['f1'],
      })
      .select()
      .single();

    if (error || !data) {
      return { success: false, error: 'Error al crear cuenta' };
    }

    const userData: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      tokens: data.tokens || 100,
      avatar: data.avatar,
      competitions: data.competitions || ['f1'],
    };

    setUser(userData);
    localStorage.setItem('unai_user_id', data.id);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unai_user_id');
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    await supabase
      .from('users')
      .update({
        username: updates.username ?? user.username,
        tokens: updates.tokens ?? user.tokens,
        avatar: updates.avatar ?? user.avatar,
        competitions: updates.competitions ?? user.competitions,
      })
      .eq('id', user.id);

    setUser({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

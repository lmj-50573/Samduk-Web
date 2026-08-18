import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface Profile {
    id: string;
    email: string;
    role: 'user' | 'admin';
    full_name: string | null;
    username: string | null;
    phone: string | null;
  }

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (username: string, password: string, fullName: string, phone: string) => Promise<{ error: string | null }>;
  signIn: (username: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data as Profile);
    }
  };

  useEffect(() => {
    // 현재 로그인 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // 로그인 상태 변화 감지 (로그인, 로그아웃 등)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    username: string,
    password: string,
    fullName: string,
    phone: string
  ) => {
    // 아이디를 내부적으로 이메일 형식으로 변환
    const fakeEmail = `${username}@wantu.local`;

    const { error } = await supabase.auth.signUp({
      email: fakeEmail,
      password,
      options: {
        data: {
          username,
          full_name: fullName,
          phone,
        },
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return { error: '이미 사용 중인 아이디입니다.' };
      }
      return { error: error.message };
    }
    return { error: null };
  };

  const signIn = async (username: string, password: string) => {
    const fakeEmail = `${username}@wantu.local`;

    const { error } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    });

    if (error) {
      return { error: '아이디 또는 비밀번호가 올바르지 않습니다.' };
    }
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const isAdmin = profile?.role === 'admin';

  return (
<AuthContext.Provider value={{ session, user, profile, loading, isAdmin, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 안에서 사용해야 합니다.');
  }
  return context;
};
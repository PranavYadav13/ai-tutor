import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase configuration. Please click the "Connect to Supabase" button to set up your project.'
  );
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

interface AuthContextType {
  session: User | null;
  supabase: SupabaseClient;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Set initialized immediately since we're not waiting for real auth
    setIsInitialized(true);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Create a mock user session with the provided email
    const mockUser: User = {
      id: 'mock-user-id',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email: email,
      role: 'authenticated',
    };
    
    setSession(mockUser);
  };

  const signOut = async () => {
    setSession(null);
  };

  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ session, supabase, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
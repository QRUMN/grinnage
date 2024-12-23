import { atom } from 'jotai';
import type { UserRole } from '../types/auth';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
}

export const authStateAtom = atom<AuthState>({
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
});

// Auth actions
export const login = async (email: string, password: string) => {
  try {
    // Add your API call here
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  // Add your logout logic here
  localStorage.removeItem('token');
  return authStateAtom.set({ isAuthenticated: false, loading: false, user: null, error: null });
};
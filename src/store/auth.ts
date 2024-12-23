import { atom } from 'jotai';

export type UserRole = 'residential' | 'commercial' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authStateAtom = atom<AuthState>(initialState);

// Write-only atom for setting user
export const setUserAtom = atom(
  null,
  (get, set, user: User | null) => {
    set(authStateAtom, {
      isAuthenticated: !!user,
      user,
    });
  }
);

export const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'residential':
      return '/dashboard';
    case 'commercial':
      return '/commercial';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
};

export const logout = async () => {
  // Clear auth state
  authStateAtom.onMount = (setAtom) => {
    setAtom({ isAuthenticated: false, user: null });
  };
  localStorage.removeItem('token');
};
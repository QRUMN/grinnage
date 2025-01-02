import { atom } from 'jotai';

export type UserRole = 'admin' | 'commercial' | 'residential' | 'user' | 'manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  clientType?: 'residential' | 'commercial';
  companyName?: string;
  companySize?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive' | 'suspended';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const authStateAtom = atom<AuthState>(initialState);

// Write-only atom for setting user
export const setUserAtom = atom(
  null,
  (get, set, user: User | null) => {
    set(authStateAtom, {
      isAuthenticated: !!user,
      user,
      loading: false,
      error: null,
    });
  }
);

// Write-only atom for setting loading state
export const setLoadingAtom = atom(
  null,
  (get, set, loading: boolean) => {
    set(authStateAtom, {
      ...get(authStateAtom),
      loading,
    });
  }
);

// Write-only atom for setting error
export const setErrorAtom = atom(
  null,
  (get, set, error: string | null) => {
    set(authStateAtom, {
      ...get(authStateAtom),
      error,
      loading: false,
    });
  }
);

export const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'user':
      return '/dashboard';
    case 'manager':
      return '/manager';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
};

export const logout = async () => {
  // Clear auth state
  authStateAtom.onMount = (setAtom) => {
    setAtom({ isAuthenticated: false, user: null, loading: false, error: null });
  };
  localStorage.removeItem('token');
};
import { atom } from 'jotai';
import type { AuthState, User } from '../types/auth';

export const authStateAtom = atom<AuthState>({
  user: null,
  isAuthenticated: false,
  loading: true,
});

export const setUserAtom = atom(
  null,
  (get, set, user: User | null) => {
    set(authStateAtom, {
      user,
      isAuthenticated: !!user,
      loading: false,
    });
  }
);
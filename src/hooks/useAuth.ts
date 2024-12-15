import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { authStateAtom, setUserAtom } from '../store/auth';
import { authApi } from '../lib/api/auth';

export const useAuth = () => {
  const authState = useAtomValue(authStateAtom);
  const setUser = useSetAtom(setUserAtom);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authApi.getCurrentUser();
        setUser(user);
      } catch (error) {
        setUser(null);
      }
    };

    if (authState.loading) {
      initAuth();
    }
  }, [authState.loading, setUser]);

  return authState;
};
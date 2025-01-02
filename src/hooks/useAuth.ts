import { useAtom } from 'jotai';
import { authStateAtom, setUserAtom, setLoadingAtom, setErrorAtom, User } from '../store/auth';

export function useAuth() {
  const [authState] = useAtom(authStateAtom);
  const [, setUser] = useAtom(setUserAtom);
  const [, setLoading] = useAtom(setLoadingAtom);
  const [, setError] = useAtom(setErrorAtom);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      // Make API call to login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setUser(data.user as User);
      localStorage.setItem('token', data.token);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during login');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Make API call to logout
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });

      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during logout');
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }

      // Make API call to validate token
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      setUser(data.user as User);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    login,
    logout,
    checkAuth,
  };
}
import React from 'react';
import { useAtomValue } from 'jotai';
import { Navigate, useLocation } from 'react-router-dom';
import { authStateAtom } from '../../store/auth';
import type { UserRole } from '../../types/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { isAuthenticated, loading, user } = useAtomValue(authStateAtom);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#56e39f]"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user.role === 'commercial' 
      ? '/commercial'
      : user.role === 'admin'
      ? '/admin'
      : '/dashboard';
    
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '../../types/auth';
import { FormInput } from '../common/form';
import { useSetAtom } from 'jotai';
import { setUserAtom } from '../../store/auth';
import { authApi } from '../../lib/api/auth';
import { toast } from 'sonner';

interface LoginError {
  message: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(setUserAtom);
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userType: 'residential'
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authApi.login(data);
      setUser(response.user);
      
      // Show success message
      toast.success('Successfully logged in!');
      
      // Redirect based on user type
      const dashboardPaths = {
        admin: '/admin',
        commercial: '/commercial',
        residential: '/dashboard'
      };
      
      navigate(dashboardPaths[response.user.role] || '/dashboard');
    } catch (error) {
      const loginError = error as LoginError;
      const errorMessage = loginError.message || 'An error occurred during login';
      setError('root', { message: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-base font-medium text-gray-900">User Type</label>
        <div className="mt-2 space-y-4">
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                value="residential"
                {...register('userType')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2">Residential</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="commercial"
                {...register('userType')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2">Commercial</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="admin"
                {...register('userType')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
          {errors.userType && (
            <p className="text-sm text-red-500">{errors.userType.message}</p>
          )}
        </div>
      </div>

      <FormInput
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <FormInput
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>

      {errors.root && (
        <div className="text-sm text-red-500 mt-2">
          {errors.root.message}
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Demo Accounts:</p>
        <p>residential@example.com / password123</p>
        <p>commercial@example.com / password123</p>
        <p>admin@example.com / password123</p>
      </div>
    </form>
  );
};
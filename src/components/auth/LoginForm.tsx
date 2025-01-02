import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/ui/Button';
import { Input } from '../common/ui/Input';
import { Alert } from '../common/ui/Alert';
import { LoadingSpinner } from '../common/ui/LoadingSpinner';
import { loginSchema, type LoginFormData } from '../../types/auth';
import { useSetAtom } from 'jotai';
import { setUserAtom } from '../../store/auth';
import { authApi } from '../../lib/api/auth';
import { toast } from 'sonner';

const updatedLoginSchema = z.object({
  userType: z.string(),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type UpdatedLoginFormData = z.infer<typeof updatedLoginSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(setUserAtom);
  const { login, error, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdatedLoginFormData>({
    resolver: zodResolver(updatedLoginSchema),
    defaultValues: {
      userType: 'residential'
    }
  });

  const onSubmit = async (data: UpdatedLoginFormData) => {
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
    } catch (err) {
      const loginError = err as { message: string };
      const errorMessage = loginError.message || 'An error occurred during login';
      setError('root', { message: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="space-y-2">
        <div>
          <label className="text-base font-medium text-gray-900">User Type</label>
          <div className="mt-2 space-y-4">
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="residential"
                  {...register('userType')}
                  className="h-4 w-4 border-gray-300 text-[#56e39f] focus:ring-[#56e39f]"
                />
                <span className="ml-2">Residential</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="commercial"
                  {...register('userType')}
                  className="h-4 w-4 border-gray-300 text-[#56e39f] focus:ring-[#56e39f]"
                />
                <span className="ml-2">Commercial</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="admin"
                  {...register('userType')}
                  className="h-4 w-4 border-gray-300 text-[#56e39f] focus:ring-[#56e39f]"
                />
                <span className="ml-2">Admin</span>
              </label>
            </div>
            {errors.userType && (
              <p className="text-sm text-red-500">{errors.userType.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              error={errors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>

        {errors.root && (
          <div className="text-sm text-red-500 mt-2">
            {errors.root.message}
          </div>
        )}

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => navigate('/forgot-password')}
            className="text-sm"
          >
            Forgot your password?
          </Button>
        </div>
      </div>
    </form>
  );
};
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormData } from '../../types/auth';
import { FormInput } from '../common/form';
import { useSetAtom } from 'jotai';
import { setUserAtom } from '../../store/auth';
import { authApi } from '../../lib/api/auth';

export const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(setUserAtom);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      
      // Redirect based on user type
      switch (response.user.role) {
        case 'commercial':
          navigate('/commercial');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      setError('root', {
        message: 'Invalid email or password',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">User Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="residential"
              {...register('userType')}
              className="h-4 w-4 text-[#56e39f] border-gray-300 focus:ring-[#56e39f]"
            />
            <span className="ml-2 text-sm text-gray-700">Residential</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="commercial"
              {...register('userType')}
              className="h-4 w-4 text-[#56e39f] border-gray-300 focus:ring-[#56e39f]"
            />
            <span className="ml-2 text-sm text-gray-700">Commercial</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="admin"
              {...register('userType')}
              className="h-4 w-4 text-[#56e39f] border-gray-300 focus:ring-[#56e39f]"
            />
            <span className="ml-2 text-sm text-gray-700">Admin</span>
          </label>
        </div>
      </div>

      <FormInput
        label="Email address"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <FormInput
        label="Password"
        type="password"
        autoComplete="current-password"
        {...register('password')}
        error={errors.password?.message}
      />

      {errors.root && (
        <div className="text-center bg-red-50 p-3 rounded-lg">
          <p className="text-sm text-red-600">{errors.root.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#56e39f] hover:bg-[#33d789] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#56e39f] disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Demo Accounts:</p>
        <p>residential@example.com / password123</p>
        <p>commercial@example.com / password123</p>
        <p>admin@example.com / password123</p>
      </div>
    </form>
  );
};
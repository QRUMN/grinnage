import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  userType: z.enum(['user', 'manager', 'admin']),
  companyName: z.string().optional(),
  companySize: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerUser, error, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const userType = watch('userType');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
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
        <Input
          type="text"
          placeholder="Full Name"
          {...register('name')}
          error={errors.name?.message}
        />
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

      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-base font-medium text-gray-900">User Type</label>
        <div className="mt-2 space-y-4">
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                value="user"
                {...register('userType')}
                className="h-4 w-4 border-gray-300 text-[#56e39f] focus:ring-[#56e39f]"
              />
              <span className="ml-2">User</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="manager"
                {...register('userType')}
                className="h-4 w-4 border-gray-300 text-[#56e39f] focus:ring-[#56e39f]"
              />
              <span className="ml-2">Manager</span>
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

      {userType === 'manager' && (
        <>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Company Name"
              {...register('companyName')}
              error={errors.companyName?.message}
            />
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Company Size"
              {...register('companySize')}
              error={errors.companySize?.message}
            />
          </div>
        </>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
        {loading ? 'Creating account...' : 'Create account'}
      </Button>

      <div className="text-center">
        <Button
          variant="link"
          onClick={() => navigate('/login')}
          className="text-sm"
        >
          Already have an account? Sign in
        </Button>
      </div>
    </form>
  );
}

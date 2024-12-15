import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Input } from '../../common/Input';
import type { OnboardingFormData } from '../../../types';

interface PersonalInfoStepProps {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  watch: UseFormWatch<OnboardingFormData>;
}

export const PersonalInfoStep = ({ register, errors, watch }: PersonalInfoStepProps) => {
  const clientType = watch('clientType');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="residential"
                {...register('clientType')}
                className="h-4 w-4 text-[#56e39f] border-gray-300 focus:ring-[#56e39f]"
              />
              <span className="ml-2 text-gray-700">Residential</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="commercial"
                {...register('clientType')}
                className="h-4 w-4 text-[#56e39f] border-gray-300 focus:ring-[#56e39f]"
              />
              <span className="ml-2 text-gray-700">Commercial</span>
            </label>
          </div>
        </div>
      </div>

      <Input
        label="Full Name"
        placeholder={clientType === 'commercial' ? 'Business Name' : 'Your Full Name'}
        {...register('fullName')}
        error={errors.fullName?.message}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Create Password"
        type="password"
        placeholder="Min. 8 characters"
        {...register('password')}
        error={errors.password?.message}
      />

      <p className="text-sm text-gray-500 mt-4">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};
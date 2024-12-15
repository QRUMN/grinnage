import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '../../common/Input';
import type { OnboardingFormData } from '../../../types';

interface PestInfoStepProps {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
}

export const PestInfoStep = ({ register, errors }: PestInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe Your Pest Problem
        </label>
        <textarea
          {...register('pestProblem')}
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#56e39f] focus:ring-[#56e39f] text-gray-700 placeholder-gray-400"
          placeholder="Please describe the pest issues you're experiencing..."
        />
        {errors.pestProblem && (
          <p className="mt-1 text-sm text-red-600">{errors.pestProblem.message}</p>
        )}
      </div>

      <Input
        label="Preferred Inspection Date"
        type="date"
        {...register('preferredDate')}
        error={errors.preferredDate?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes or Concerns
        </label>
        <textarea
          {...register('additionalNotes')}
          rows={3}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#56e39f] focus:ring-[#56e39f] text-gray-700 placeholder-gray-400"
          placeholder="Any additional information you'd like us to know..."
        />
      </div>
    </div>
  );
};
import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Input } from '../../common/Input';
import type { OnboardingFormData } from '../../../types';

interface PropertyDetailsStepProps {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  watch: UseFormWatch<OnboardingFormData>;
}

export const PropertyDetailsStep = ({ register, errors, watch }: PropertyDetailsStepProps) => {
  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <div className="space-y-6">
      <Input
        label="Phone Number"
        type="tel"
        placeholder="(555) 123-4567"
        {...register('phone', {
          onChange: (e) => {
            e.target.value = formatPhoneNumber(e.target.value);
          },
        })}
        error={errors.phone?.message}
      />

      <Input
        label="Street Address"
        placeholder="123 Main Street"
        {...register('address')}
        error={errors.address?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          placeholder="Enter city"
          {...register('city')}
          error={errors.city?.message}
        />
        <Input
          label="State"
          placeholder="Enter state"
          {...register('state')}
          error={errors.state?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Size
        </label>
        <select
          {...register('propertySize')}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#56e39f] focus:ring-[#56e39f] text-gray-700 px-4 py-3"
        >
          <option value="">Select property size...</option>
          <option value="small">Small (less than 1000 sq ft)</option>
          <option value="medium">Medium (1000-2500 sq ft)</option>
          <option value="large">Large (more than 2500 sq ft)</option>
        </select>
        {errors.propertySize && (
          <p className="mt-1 text-sm text-red-600">{errors.propertySize.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Problem Area Location
        </label>
        <textarea
          {...register('problemArea')}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#56e39f] focus:ring-[#56e39f] text-gray-700 px-4 py-3"
          placeholder="Describe where you're experiencing the pest problem (e.g., kitchen, basement, yard)"
          rows={3}
        />
        {errors.problemArea && (
          <p className="mt-1 text-sm text-red-600">{errors.problemArea.message}</p>
        )}
      </div>
    </div>
  );
};
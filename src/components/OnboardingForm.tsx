import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema } from '../lib/validation/onboarding';
import type { OnboardingFormData } from '../types';

const PROPERTY_SIZES = {
  small: 'Small (less than 1000 sq ft)',
  medium: 'Medium (1000-2500 sq ft)',
  large: 'Large (more than 2500 sq ft)',
} as const;

export const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      // TODO: Implement form submission
      console.log('Form data:', data);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
              step >= num ? 'bg-blue-900 text-white' : 'bg-gray-200'
            }`}>
              {num}
            </div>
            {num < 3 && (
              <div className={`h-1 w-16 ${
                step > num ? 'bg-blue-900' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Client Type
        </label>
        <select
          {...register('clientType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </select>
        {errors.clientType && (
          <p className="mt-1 text-sm text-red-600">{errors.clientType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          {...register('fullName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
    </div>
  );

  const renderPropertyDetails = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property Size
        </label>
        <select
          {...register('propertySize')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select size...</option>
          {Object.entries(PROPERTY_SIZES).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.propertySize && (
          <p className="mt-1 text-sm text-red-600">{errors.propertySize.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pest Problem
        </label>
        <textarea
          {...register('pestProblem')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe your pest problem..."
        />
        {errors.pestProblem && (
          <p className="mt-1 text-sm text-red-600">{errors.pestProblem.message}</p>
        )}
      </div>
    </div>
  );

  const renderScheduling = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Preferred Service Date
        </label>
        <input
          type="date"
          {...register('preferredDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.preferredDate && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          {...register('additionalNotes')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.additionalNotes && (
          <p className="mt-1 text-sm text-red-600">{errors.additionalNotes.message}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {renderStepIndicator()}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && renderPersonalInfo()}
        {step === 2 && renderPropertyDetails()}
        {step === 3 && renderScheduling()}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
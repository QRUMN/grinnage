import React, { useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PEST_CATEGORIES, PEST_TYPES } from '../../../types/pest';
import type { OnboardingFormData } from '../../../types';

interface PestSelectionStepProps {
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
}

export const PestSelectionStep = ({ register, errors }: PestSelectionStepProps) => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof PEST_TYPES>('insects');

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          What type of pest issue are you experiencing?
        </label>
        
        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(PEST_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedCategory(key as keyof typeof PEST_TYPES)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                selectedCategory === key
                  ? 'border-[#56e39f] bg-[#56e39f]/10 text-gray-900'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Pest Type Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PEST_TYPES[selectedCategory].map(({ id, label }) => (
            <label
              key={id}
              className="relative flex items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                value={id}
                {...register('pestType')}
                className="h-4 w-4 text-[#56e39f] border-gray-300 focus:ring-[#56e39f]"
              />
              <span className="ml-3 text-gray-700">{label}</span>
            </label>
          ))}
        </div>
        {errors.pestType && (
          <p className="mt-2 text-sm text-red-600">{errors.pestType.message}</p>
        )}
      </div>
    </div>
  );
};
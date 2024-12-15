import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
              currentStep >= index + 1 ? 'bg-mint-400 text-white' : 'bg-gray-200'
            }`}>
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className={`h-1 w-16 ${
                currentStep > index + 1 ? 'bg-mint-400' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
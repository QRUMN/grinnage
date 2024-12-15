import React from 'react';

interface FormNavigationProps {
  step: number;
  isSubmitting: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const FormNavigation = ({ 
  step, 
  isSubmitting, 
  onNext, 
  onPrev 
}: FormNavigationProps) => {
  return (
    <div className="flex justify-between pt-6">
      {step > 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Previous
        </button>
      )}
      {step < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="ml-auto px-6 py-2.5 text-sm font-medium text-white bg-[#56e39f] rounded-lg hover:bg-[#33d789] transition-colors duration-200"
        >
          Next Step
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto px-6 py-2.5 text-sm font-medium text-white bg-[#56e39f] rounded-lg hover:bg-[#33d789] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
        </button>
      )}
    </div>
  );
};
import React from 'react';
import { useOnboardingForm } from '../../hooks/useOnboardingForm';
import { StepIndicator } from './StepIndicator';
import { PestSelectionStep } from './steps/PestSelectionStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { PropertyDetailsStep } from './steps/PropertyDetailsStep';
import { PestInfoStep } from './steps/PestInfoStep';
import { FormNavigation } from './FormNavigation';

export const OnboardingForm = () => {
  const { 
    step, 
    form: { register, handleSubmit, formState: { errors, isSubmitting }, watch },
    onSubmit,
    nextStep,
    prevStep 
  } = useOnboardingForm();

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <PestSelectionStep register={register} errors={errors} />;
      case 2:
        return <PersonalInfoStep register={register} errors={errors} watch={watch} />;
      case 3:
        return <PropertyDetailsStep register={register} errors={errors} />;
      case 4:
        return <PestInfoStep register={register} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-8">
      <StepIndicator currentStep={step} totalSteps={4} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {renderCurrentStep()}
        <FormNavigation 
          step={step} 
          isSubmitting={isSubmitting} 
          onNext={nextStep} 
          onPrev={prevStep} 
        />
      </form>
    </div>
  );
};
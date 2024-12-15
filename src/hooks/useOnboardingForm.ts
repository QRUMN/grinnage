import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { onboardingSchema } from '../lib/validation/onboarding';
import { authApi } from '../lib/api/auth';
import type { OnboardingFormData } from '../types';

export const useOnboardingForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: {
      clientType: 'residential',
    }
  });

  const { trigger } = form;

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await trigger(fields);
    if (isValid) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      const formData = JSON.parse(JSON.stringify(data));
      const response = await authApi.register(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return {
    step,
    nextStep,
    prevStep,
    form,
    onSubmit,
  };
};

// Helper function to get fields for each step
const getFieldsForStep = (step: number): (keyof OnboardingFormData)[] => {
  switch (step) {
    case 1:
      return ['pestType'];
    case 2:
      return ['clientType', 'fullName', 'email', 'password'];
    case 3:
      return ['phone', 'address', 'city', 'state', 'propertySize', 'problemArea'];
    case 4:
      return ['pestProblem', 'preferredDate'];
    default:
      return [];
  }
};
import React from 'react';
import { OnboardingForm } from '../components/onboarding/OnboardingForm';
import { Container } from '../components/common/Container';

export const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Get Started with Pest Control</h1>
            <p className="mt-2 text-lg text-gray-600">
              Complete this form to schedule your free inspection and create your account
            </p>
          </div>
          <OnboardingForm />
        </div>
      </Container>
    </div>
  );
};
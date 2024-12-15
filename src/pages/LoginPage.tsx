import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Container } from '../components/common/Container';
import { Bug } from 'lucide-react';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Bug className="w-12 h-12 text-[#56e39f]" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/onboarding" className="font-medium text-[#56e39f] hover:text-[#33d789]">
              schedule a free inspection
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm />
          </div>
        </div>
      </Container>
    </div>
  );
};
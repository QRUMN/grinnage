import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const RegistrationAlert = () => {
  const location = useLocation();
  const registrationData = location.state?.registrationData;

  if (!registrationData) return null;

  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
      <div className="flex items-center">
        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        <p className="text-green-700 dark:text-green-300">
          Your inspection request has been received! We'll contact you shortly to confirm your appointment.
        </p>
      </div>
    </div>
  );
};
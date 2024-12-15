import React from 'react';
import { AlertCircle, Phone } from 'lucide-react';

export const EmergencyCallout = () => {
  return (
    <div className="bg-red-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span className="font-medium">Emergency Pest Control - Available 24/7</span>
          </div>
          <a 
            href="tel:5551234567" 
            className="flex items-center bg-white text-red-600 px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            <span className="font-medium">(555) 123-4567</span>
          </a>
        </div>
      </div>
    </div>
  );
};
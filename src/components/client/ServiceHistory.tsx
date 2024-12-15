import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import type { ServiceRecord } from '../../types/client';

interface ServiceHistoryProps {
  services: ServiceRecord[];
}

export const ServiceHistory = ({ services }: ServiceHistoryProps) => {
  const getStatusIcon = (status: ServiceRecord['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Service History</h2>
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              {getStatusIcon(service.status)}
              <div>
                <p className="font-medium">{service.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(service.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Technician: {service.technician}</p>
              {service.notes && (
                <p className="text-sm text-gray-500 mt-1">{service.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { User, MapPin, Phone, Mail, Building2 } from 'lucide-react';
import type { Client } from '../../types/client';

interface ClientProfileProps {
  client: Client;
  onEdit: () => void;
}

export const ClientProfile = ({ client, onEdit }: ClientProfileProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">Client Profile</h2>
        <button
          onClick={onEdit}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
        >
          Edit Profile
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{client.fullName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{client.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{client.phone}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{client.address}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Building2 className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Property Details</p>
            <p className="font-medium">
              {client.clientType} - {client.propertySize}
            </p>
          </div>
        </div>
      </div>

      {client.activeSubscription && (
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">Active Subscription</h3>
          <p className="text-sm text-gray-600">
            {client.activeSubscription.name} - {client.activeSubscription.frequency}
          </p>
          {client.activeSubscription.nextServiceDate && (
            <p className="text-sm text-blue-900 mt-2">
              Next service: {client.activeSubscription.nextServiceDate}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
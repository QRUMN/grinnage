import React from 'react';
import { Building2, MapPin, Phone, Mail, Plus } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';

export const CommercialLocations = () => {
  const locations = [
    {
      id: '1',
      name: 'Main Office',
      address: '123 Business Ave',
      city: 'New York',
      state: 'NY',
      phone: '(555) 123-4567',
      email: 'main@example.com',
      status: 'active',
      lastService: '2024-02-28',
      nextService: '2024-03-28'
    },
    {
      id: '2',
      name: 'Warehouse A',
      address: '456 Industrial Pkwy',
      city: 'New York',
      state: 'NY',
      phone: '(555) 234-5678',
      email: 'warehouse@example.com',
      status: 'active',
      lastService: '2024-02-15',
      nextService: '2024-03-15'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Locations</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your business locations</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location) => (
          <DashboardCard key={location.id}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-6 h-6 text-[#56e39f]" />
                  <h3 className="text-lg font-semibold">{location.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  location.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {location.status}
                </span>
              </div>

              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{location.address}, {location.city}, {location.state}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{location.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{location.email}</span>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-500">Last Service</p>
                    <p className="font-medium">{location.lastService}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Next Service</p>
                    <p className="font-medium">{location.nextService}</p>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { Building2, MapPin, Calendar, AlertTriangle, Truck, CheckCircle } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';

export const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard>
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Total Locations</h3>
              <p className="text-2xl font-semibold">12</p>
              <p className="text-sm text-gray-500">Active service locations</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Scheduled Services</h3>
              <p className="text-2xl font-semibold">8</p>
              <p className="text-sm text-gray-500">Upcoming this week</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Active Alerts</h3>
              <p className="text-2xl font-semibold">3</p>
              <p className="text-sm text-gray-500">Require attention</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Recent Activity">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <activity.icon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Location Status">
          <div className="space-y-4">
            {locationStatus.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{location.name}</p>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  location.status === 'Active' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {location.status}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

const recentActivity = [
  {
    icon: Truck,
    title: 'Service completed at Downtown Office',
    time: '2 hours ago'
  },
  {
    icon: AlertTriangle,
    title: 'New alert reported at Warehouse B',
    time: '4 hours ago'
  },
  {
    icon: CheckCircle,
    title: 'Monthly inspection completed',
    time: '1 day ago'
  },
];

const locationStatus = [
  {
    name: 'Main Office',
    address: '123 Business Ave',
    status: 'Active'
  },
  {
    name: 'Warehouse A',
    address: '456 Industrial Pkwy',
    status: 'Active'
  },
  {
    name: 'Warehouse B',
    address: '789 Storage Rd',
    status: 'Attention Required'
  },
];

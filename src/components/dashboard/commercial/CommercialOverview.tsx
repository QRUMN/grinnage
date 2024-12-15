import React from 'react';
import { Building2, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';
import { StatCard } from '../common/StatCard';

export const CommercialOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Commercial Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your business locations and services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Locations"
          value="12"
          icon={<Building2 className="w-8 h-8 text-[#56e39f]" />}
        />
        <StatCard
          label="Active Contracts"
          value="8"
          icon={<CheckCircle className="w-8 h-8 text-green-500" />}
        />
        <StatCard
          label="Service Requests"
          value="5"
          icon={<AlertCircle className="w-8 h-8 text-yellow-500" />}
        />
        <StatCard
          label="Staff Trained"
          value="45"
          icon={<Users className="w-8 h-8 text-blue-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Recent Activity">
          <div className="space-y-4">
            {[
              { date: 'Mar 1', action: 'Monthly inspection completed', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
              { date: 'Feb 28', action: 'New location added', icon: <Building2 className="w-5 h-5 text-[#56e39f]" /> },
              { date: 'Feb 27', action: 'Service request submitted', icon: <AlertCircle className="w-5 h-5 text-yellow-500" /> },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b dark:border-dark-700 last:border-0">
                <div className="flex items-center space-x-3">
                  {activity.icon}
                  <span className="text-gray-900 dark:text-white">{activity.action}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">{activity.date}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Location Status">
          <div className="space-y-4">
            {[
              { name: 'Main Office', status: 'Active', lastService: 'Feb 28, 2024' },
              { name: 'Warehouse A', status: 'Due Soon', lastService: 'Jan 15, 2024' },
              { name: 'Branch Office', status: 'Active', lastService: 'Feb 20, 2024' },
            ].map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-800 rounded-lg">
                <div>
                  <h3 className="font-medium">{location.name}</h3>
                  <p className="text-sm text-gray-500">Last service: {location.lastService}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  location.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
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
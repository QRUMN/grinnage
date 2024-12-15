import React from 'react';
import { Settings, Globe, Clock } from 'lucide-react';
import { DashboardCard } from '../../common/DashboardCard';

export const GeneralSettings = () => {
  return (
    <DashboardCard title="General Settings">
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium">System Language</p>
              <p className="text-sm text-gray-500">Set default language for the system</p>
            </div>
          </div>
          <select className="rounded-lg border border-gray-300 dark:border-dark-700 focus:ring-2 focus:ring-[#56e39f]">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium">Time Zone</p>
              <p className="text-sm text-gray-500">Set system default timezone</p>
            </div>
          </div>
          <select className="rounded-lg border border-gray-300 dark:border-dark-700 focus:ring-2 focus:ring-[#56e39f]">
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
          </select>
        </div>

        <button className="btn-primary w-full">Save Changes</button>
      </div>
    </DashboardCard>
  );
};
import React from 'react';
import { Building2, Users, Bell } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';
import { FormInput } from '../../common/form';

export const CommercialSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your business preferences</p>
      </div>

      <DashboardCard title="Company Information">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Company Name"
              defaultValue="ABC Corporation"
              placeholder="Enter company name"
            />
            <FormInput
              label="Business ID"
              defaultValue="ABC-123456"
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Primary Contact"
              defaultValue="John Smith"
              placeholder="Enter contact name"
            />
            <FormInput
              label="Contact Email"
              type="email"
              defaultValue="contact@abccorp.com"
              placeholder="Enter email"
            />
          </div>

          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </DashboardCard>

      <DashboardCard title="Notification Preferences">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">Service Reminders</p>
                <p className="text-sm text-gray-500">Get notified about upcoming services</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#56e39f] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#56e39f]"></div>
            </label>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};
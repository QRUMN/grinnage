import React from 'react';
import { Lock, Shield, Smartphone } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';
import { FormInput } from '../../common/form/FormInput';

export const SecuritySettings = () => {
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change
  };

  return (
    <DashboardCard title="Security Settings">
      <div className="space-y-8">
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <h3 className="text-lg font-medium">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Current Password"
              type="password"
              placeholder="Enter current password"
            />
            <FormInput
              label="New Password"
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <button type="submit" className="btn-primary">
            Update Password
          </button>
        </form>

        <div className="border-t dark:border-dark-700 pt-6">
          <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">Two-Factor Auth</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
            </div>
            <button className="text-[#56e39f] hover:text-[#33d789] font-medium">
              Enable
            </button>
          </div>
        </div>

        <div className="border-t dark:border-dark-700 pt-6">
          <h3 className="text-lg font-medium mb-4">Login History</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Last successful login</p>
                  <p className="text-sm text-gray-500">March 1, 2024 10:30 AM</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">New York, USA</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};
import React from 'react';
import { GeneralSettings } from './settings/GeneralSettings';
import { SecuritySettings } from './settings/SecuritySettings';

export const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeneralSettings />
        <SecuritySettings />
      </div>
    </div>
  );
};
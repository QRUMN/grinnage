import React from 'react';
import { ProfileSettings } from '../../components/dashboard/settings/ProfileSettings';
import { NotificationSettings } from '../../components/dashboard/settings/NotificationSettings';
import { SecuritySettings } from '../../components/dashboard/settings/SecuritySettings';

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        <ProfileSettings />
        <NotificationSettings />
        <SecuritySettings />
      </div>
    </div>
  );
};
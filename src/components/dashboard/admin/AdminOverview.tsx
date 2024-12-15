import React from 'react';
import { AdminStats } from './overview/AdminStats';
import { RecentActivities } from './overview/RecentActivities';
import { SystemHealth } from './overview/SystemHealth';
import { SecurityAlerts } from './overview/SecurityAlerts';

export const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">System overview and management</p>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemHealth />
        <SecurityAlerts />
      </div>

      <RecentActivities />
    </div>
  );
};
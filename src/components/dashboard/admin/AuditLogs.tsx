import React from 'react';
import { AuditFilters } from './audit/AuditFilters';
import { AuditLogTable } from './audit/AuditLogTable';
import { DashboardCard } from '../common/DashboardCard';

export const AuditLogs = () => {
  const logs = [
    {
      id: '1',
      action: 'User Login',
      user: 'john@example.com',
      timestamp: '2024-03-01 10:30:00',
      details: 'Successful login attempt',
      type: 'info' as const
    },
    {
      id: '2',
      action: 'Settings Update',
      user: 'admin@example.com',
      timestamp: '2024-03-01 11:15:00',
      details: 'System settings modified',
      type: 'warning' as const
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
        <p className="text-gray-600 dark:text-gray-400">System activity and security logs</p>
      </div>

      <DashboardCard>
        <div className="p-6">
          <AuditFilters onFilterChange={() => {}} />
          <AuditLogTable logs={logs} />
        </div>
      </DashboardCard>
    </div>
  );
};
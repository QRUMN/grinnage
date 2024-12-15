import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { DashboardCard } from '../../common/DashboardCard';

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "Multiple failed login attempts detected",
    timestamp: "10 minutes ago",
    location: "192.168.1.105"
  },
  {
    id: 2,
    type: "info",
    message: "System backup completed successfully",
    timestamp: "1 hour ago",
    location: "Backup Server"
  }
];

export const SecurityAlerts = () => {
  return (
    <DashboardCard 
      title="Security Alerts"
      action={<Shield className="w-5 h-5 text-[#56e39f]" />}
    >
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
            <AlertTriangle className={`w-5 h-5 ${
              alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
            }`} />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">{alert.message}</p>
              <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                <span>{alert.timestamp}</span>
                <span>•</span>
                <span>{alert.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
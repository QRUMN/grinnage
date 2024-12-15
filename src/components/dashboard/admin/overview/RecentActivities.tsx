import React from 'react';
import { Users, Settings, AlertCircle } from 'lucide-react';
import { DashboardCard } from '../../common/DashboardCard';

const activities = [
  {
    id: 1,
    action: "New user registration",
    user: "john@example.com",
    timestamp: "5 minutes ago",
    icon: <Users className="w-5 h-5 text-blue-500" />
  },
  {
    id: 2,
    action: "System settings updated",
    user: "admin@example.com",
    timestamp: "1 hour ago",
    icon: <Settings className="w-5 h-5 text-green-500" />
  },
  {
    id: 3,
    action: "Security alert detected",
    user: "system",
    timestamp: "2 hours ago",
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />
  }
];

export const RecentActivities = () => {
  return (
    <DashboardCard title="Recent Activities">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
            <div className="flex items-center space-x-3">
              {activity.icon}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.user}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{activity.timestamp}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
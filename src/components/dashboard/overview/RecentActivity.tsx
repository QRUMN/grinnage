import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { ActivityItem } from '../common/ActivityItem';

export const RecentActivity = () => {
  const activities = [
    {
      date: 'Feb 28',
      action: 'Monthly inspection completed',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    {
      date: 'Feb 15',
      action: 'Invoice paid',
      icon: <CheckCircle className="w-5 h-5 text-[#56e39f]" />
    },
    {
      date: 'Feb 1',
      action: 'Treatment plan updated',
      icon: <Clock className="w-5 h-5 text-blue-500" />
    }
  ];

  return (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
};
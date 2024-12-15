import React from 'react';

interface ActivityItemProps {
  date: string;
  action: string;
  icon: React.ReactNode;
}

export const ActivityItem = ({ date, action, icon }: ActivityItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 border-b dark:border-dark-700 last:border-0">
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-gray-900 dark:text-white">{action}</span>
      </div>
      <span className="text-gray-500 dark:text-gray-400">{date}</span>
    </div>
  );
};
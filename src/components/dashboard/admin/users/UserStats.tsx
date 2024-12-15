import React from 'react';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import { DashboardCard } from '../../common/DashboardCard';

export const UserStats = () => {
  const stats = [
    {
      label: 'Total Users',
      value: '1,234',
      icon: <Users className="h-5 w-5 text-blue-500" />,
      change: '+12%'
    },
    {
      label: 'Active Users',
      value: '1,180',
      icon: <UserCheck className="h-5 w-5 text-green-500" />,
      change: '+8%'
    },
    {
      label: 'Inactive Users',
      value: '54',
      icon: <UserX className="h-5 w-5 text-red-500" />,
      change: '-2%'
    },
    {
      label: 'New Users (30d)',
      value: '156',
      icon: <UserPlus className="h-5 w-5 text-[#56e39f]" />,
      change: '+15%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <DashboardCard key={index}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className="flex flex-col items-end">
              {stat.icon}
              <span className={`mt-1 text-sm ${
                stat.change.startsWith('+') 
                  ? 'text-green-500' 
                  : stat.change.startsWith('-')
                  ? 'text-red-500'
                  : 'text-gray-500'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
};
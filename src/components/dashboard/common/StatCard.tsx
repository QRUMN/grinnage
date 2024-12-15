import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
};
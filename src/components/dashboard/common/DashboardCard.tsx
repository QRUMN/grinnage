import React from 'react';
import { cn } from '../../../utils/cn';

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const DashboardCard = ({ children, className, title }: DashboardCardProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6",
      className
    )}>
      {title && (
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
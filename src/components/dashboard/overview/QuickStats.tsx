import React from 'react';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export const QuickStats = () => {
  const stats = [
    {
      label: 'Next Service',
      value: 'March 15, 2024',
      icon: <Calendar className="w-8 h-8 text-[#56e39f]" />
    },
    {
      label: 'Active Issues',
      value: '2 Reports',
      icon: <AlertCircle className="w-8 h-8 text-yellow-500" />
    },
    {
      label: 'Treatment Status',
      value: 'Up to Date',
      icon: <CheckCircle className="w-8 h-8 text-green-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
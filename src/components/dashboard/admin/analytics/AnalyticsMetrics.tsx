import React from 'react';
import { Users, Clock, Activity, Zap } from 'lucide-react';
import { DashboardCard } from '../../common/DashboardCard';

export const AnalyticsMetrics = () => {
  const metrics = [
    {
      label: 'Active Users',
      value: '892',
      change: '+12%',
      icon: <Users className="w-5 h-5 text-blue-500" />
    },
    {
      label: 'Avg. Session',
      value: '24m',
      change: '+5%',
      icon: <Clock className="w-5 h-5 text-green-500" />
    },
    {
      label: 'Response Time',
      value: '1.2s',
      change: '-8%',
      icon: <Zap className="w-5 h-5 text-yellow-500" />
    },
    {
      label: 'Error Rate',
      value: '0.8%',
      change: '-2%',
      icon: <Activity className="w-5 h-5 text-red-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <DashboardCard key={index}>
          <div className="flex items-center justify-between p-4">
            <div>
              <div className="flex items-center space-x-2">
                {metric.icon}
                <p className="font-medium">{metric.label}</p>
              </div>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
            </div>
            <span className={`text-sm ${
              metric.change.startsWith('+') 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              {metric.change}
            </span>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
};
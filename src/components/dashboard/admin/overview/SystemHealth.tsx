import React from 'react';
import { Server, Database, Network, Cpu } from 'lucide-react';
import { DashboardCard } from '../../common/DashboardCard';

const metrics = [
  {
    name: "Server Uptime",
    value: "99.9%",
    icon: <Server className="w-5 h-5 text-green-500" />,
    status: "healthy"
  },
  {
    name: "Database Load",
    value: "45%",
    icon: <Database className="w-5 h-5 text-blue-500" />,
    status: "normal"
  },
  {
    name: "Network Latency",
    value: "24ms",
    icon: <Network className="w-5 h-5 text-yellow-500" />,
    status: "normal"
  },
  {
    name: "CPU Usage",
    value: "62%",
    icon: <Cpu className="w-5 h-5 text-purple-500" />,
    status: "normal"
  }
];

export const SystemHealth = () => {
  return (
    <DashboardCard title="System Health">
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {metric.icon}
                <span className="font-medium">{metric.name}</span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                metric.status === 'healthy' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {metric.status}
              </span>
            </div>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
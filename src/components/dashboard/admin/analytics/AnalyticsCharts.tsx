import React from 'react';
import { DashboardCard } from '../../common/DashboardCard';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, LineChart } from 'lucide-react';

export const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DashboardCard title="Revenue Trends" className="col-span-2">
        <div className="flex items-center mb-4">
          <BarChart className="h-5 w-5 mr-2" />
          <span>Monthly Revenue</span>
        </div>
        {/* Chart component goes here */}
      </DashboardCard>

      <DashboardCard title="User Growth" className="col-span-2">
        <div className="flex items-center mb-4">
          <LineChart className="h-5 w-5 mr-2" />
          <span>User Acquisition</span>
        </div>
        {/* Chart component goes here */}
      </DashboardCard>

      <DashboardCard title="User Growth">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
            <div className="flex items-center text-green-500">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>12%</span>
            </div>
          </div>
          <div className="h-64 bg-gray-100 dark:bg-dark-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">User Growth Chart</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="System Usage">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-gray-500">Average Usage</p>
            </div>
            <div className="flex items-center text-red-500">
              <ArrowDown className="w-4 h-4 mr-1" />
              <span>3%</span>
            </div>
          </div>
          <div className="h-64 bg-gray-100 dark:bg-dark-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Usage Analytics Chart</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};
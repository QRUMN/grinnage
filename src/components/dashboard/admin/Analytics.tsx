import React from 'react';
import { AnalyticsMetrics } from './analytics/AnalyticsMetrics';
import { AnalyticsCharts } from './analytics/AnalyticsCharts';

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">System performance and usage analytics</p>
      </div>

      <AnalyticsMetrics />
      <AnalyticsCharts />
    </div>
  );
};
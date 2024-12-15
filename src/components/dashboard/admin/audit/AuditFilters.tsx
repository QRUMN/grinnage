import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

interface AuditFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const AuditFilters = ({ onFilterChange }: AuditFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search audit logs..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-dark-700 focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select className="rounded-lg border border-gray-300 dark:border-dark-700 focus:ring-2 focus:ring-[#56e39f]">
            <option value="today">Today</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <select className="rounded-lg border border-gray-300 dark:border-dark-700 focus:ring-2 focus:ring-[#56e39f]">
          <option value="">All Types</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>

        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <Filter className="h-5 w-5" />
          <span>More Filters</span>
        </button>
      </div>
    </div>
  );
};
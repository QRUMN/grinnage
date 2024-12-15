import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

interface AuditFilters {
  startDate: string;
  endDate: string;
  eventType: string;
  userId: string;
}

interface AuditFiltersProps {
  onFilterChange: (filters: AuditFilters) => void;
}

export const AuditFilters: React.FC<AuditFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<AuditFilters>({
    startDate: '',
    endDate: '',
    eventType: '',
    userId: '',
  });

  const handleFilterChange = (key: keyof AuditFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

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

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <input
            type="date"
            placeholder="Start Date"
            className="w-full p-2 border rounded"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
          />
        </div>
        <div className="relative flex-1">
          <input
            type="date"
            placeholder="End Date"
            className="w-full p-2 border rounded"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
          />
        </div>
        <div className="relative flex-1">
          <select
            className="w-full p-2 border rounded"
            value={filters.eventType}
            onChange={(e) => handleFilterChange('eventType', e.target.value)}
          >
            <option value="">All Events</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>
        </div>
      </div>
    </div>
  );
};
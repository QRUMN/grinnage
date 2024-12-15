import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface UserFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: {
    role?: string;
    status?: string;
  };
  onFilterChange: (filters: any) => void;
}

export const UserFilters = ({ search, onSearchChange, filters, onFilterChange }: UserFiltersProps) => {
  const clearFilters = () => {
    onFilterChange({});
    onSearchChange('');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-dark-700 focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={filters.role}
          onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
          className="rounded-lg border border-gray-300 dark:border-dark-700 focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="commercial">Commercial</option>
          <option value="residential">Residential</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="rounded-lg border border-gray-300 dark:border-dark-700 focus:ring-2 focus:ring-[#56e39f] focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {(search || filters.role || filters.status) && (
          <button
            onClick={clearFilters}
            className="p-2 text-gray-400 hover:text-gray-500"
            title="Clear filters"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <Filter className="h-5 w-5" />
          <span>More Filters</span>
        </button>
      </div>
    </div>
  );
};
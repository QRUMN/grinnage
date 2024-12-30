import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { DatePicker } from '@/components/ui/DatePicker';
import { Badge } from '@/components/ui/Badge';
import { X, Filter, Download, Upload, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface UserFiltersProps {
  filters: {
    search: string;
    role: string;
    status: string;
    dateRange: {
      from: Date | null;
      to: Date | null;
    };
    loginStatus: string;
    activityLevel: string;
  };
  onFilterChange: (filters: any) => void;
  onExport: () => void;
  onImport: () => void;
  onRefresh: () => void;
}

const roles = ['All', 'Admin', 'Manager', 'User', 'Guest'];
const statuses = ['All', 'Active', 'Inactive', 'Suspended', 'Pending'];
const loginStatuses = ['All', 'Never Logged In', 'Logged In Today', 'Inactive (30+ days)'];
const activityLevels = ['All', 'Very Active', 'Moderately Active', 'Low Activity', 'No Activity'];

export function UserFilters({
  filters,
  onFilterChange,
  onExport,
  onImport,
  onRefresh,
}: UserFiltersProps) {
  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      role: 'All',
      status: 'All',
      dateRange: { from: null, to: null },
      loginStatus: 'All',
      activityLevel: 'All',
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.role !== 'All') count++;
    if (filters.status !== 'All') count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.loginStatus !== 'All') count++;
    if (filters.activityLevel !== 'All') count++;
    return count;
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary">
              {getActiveFilterCount()} active
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="flex items-center space-x-1"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onImport}
            className="flex items-center space-x-1"
          >
            <Upload className="h-4 w-4" />
            <span>Import</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="flex items-center space-x-1"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search users..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <Select
            value={filters.role}
            onValueChange={(value) => handleFilterChange('role', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Login Status</label>
          <Select
            value={filters.loginStatus}
            onValueChange={(value) => handleFilterChange('loginStatus', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select login status" />
            </SelectTrigger>
            <SelectContent>
              {loginStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Activity Level</label>
          <Select
            value={filters.activityLevel}
            onValueChange={(value) => handleFilterChange('activityLevel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              {activityLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Registration Date</label>
          <div className="flex items-center space-x-2">
            <DatePicker
              value={filters.dateRange.from}
              onChange={(date) =>
                handleFilterChange('dateRange', {
                  ...filters.dateRange,
                  from: date,
                })
              }
              placeholder="From"
            />
            <DatePicker
              value={filters.dateRange.to}
              onChange={(date) =>
                handleFilterChange('dateRange', {
                  ...filters.dateRange,
                  to: date,
                })
              }
              placeholder="To"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
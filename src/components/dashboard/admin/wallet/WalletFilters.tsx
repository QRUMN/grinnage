import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { X, Filter } from 'lucide-react';

interface WalletFiltersProps {
  filters: {
    dateRange: {
      from: Date | null;
      to: Date | null;
    };
    type: string;
    status: string;
    minAmount: string;
    maxAmount: string;
  };
  onFilterChange: (filters: any) => void;
}

export function WalletFilters({ filters, onFilterChange }: WalletFiltersProps) {
  const handleReset = () => {
    onFilterChange({
      dateRange: {
        from: null,
        to: null,
      },
      type: 'all',
      status: 'all',
      minAmount: '',
      maxAmount: '',
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="flex items-center space-x-1"
        >
          <X className="h-4 w-4" />
          <span>Reset</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <DateRangePicker
            value={filters.dateRange}
            onChange={(range) =>
              onFilterChange({
                ...filters,
                dateRange: range,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Transaction Type</label>
          <Select
            value={filters.type}
            onValueChange={(value) =>
              onFilterChange({
                ...filters,
                type: value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="CREDIT">Credit</SelectItem>
              <SelectItem value="DEBIT">Debit</SelectItem>
              <SelectItem value="TRANSFER">Transfer</SelectItem>
              <SelectItem value="REFUND">Refund</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              onFilterChange({
                ...filters,
                status: value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Min Amount</label>
            <Input
              type="number"
              placeholder="0.00"
              value={filters.minAmount}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minAmount: e.target.value,
                })
              }
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Max Amount</label>
            <Input
              type="number"
              placeholder="0.00"
              value={filters.maxAmount}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxAmount: e.target.value,
                })
              }
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

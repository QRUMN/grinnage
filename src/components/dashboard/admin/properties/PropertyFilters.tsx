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
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, X, Filter } from 'lucide-react';

interface PropertyFiltersProps {
  filters: {
    type: string;
    status: string;
    search: string;
    serviceDate: Date | null;
  };
  onFilterChange: (filters: any) => void;
}

export function PropertyFilters({
  filters,
  onFilterChange,
}: PropertyFiltersProps) {
  const handleReset = () => {
    onFilterChange({
      type: 'all',
      status: 'all',
      search: '',
      serviceDate: null,
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
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search properties..."
            value={filters.search}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                search: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Property Type</label>
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
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Next Service Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !filters.serviceDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.serviceDate ? (
                  format(filters.serviceDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.serviceDate}
                onSelect={(date) =>
                  onFilterChange({
                    ...filters,
                    serviceDate: date,
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Quick Filters:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onFilterChange({
              ...filters,
              status: 'active',
            })
          }
        >
          Active Only
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onFilterChange({
              ...filters,
              type: 'residential',
            })
          }
        >
          Residential
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onFilterChange({
              ...filters,
              type: 'commercial',
            })
          }
        >
          Commercial
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date();
            onFilterChange({
              ...filters,
              serviceDate: today,
            });
          }}
        >
          Service Due Today
        </Button>
      </div>
    </Card>
  );
}

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

export interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: {
    from: Date | null;
    to: Date | null;
  };
  onChange?: (range: { from: Date | null; to: Date | null }) => void;
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(
    value ? { from: value.from, to: value.to } : undefined
  );

  React.useEffect(() => {
    if (value) {
      setSelectedDate({ from: value.from, to: value.to });
    }
  }, [value]);

  const handleSelect = (date: DateRange | undefined) => {
    setSelectedDate(date);
    if (onChange) {
      onChange({
        from: date?.from ?? null,
        to: date?.to ?? null,
      });
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !selectedDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate?.from ? (
              selectedDate.to ? (
                <>
                  {format(selectedDate.from, 'LLL dd, y')} -{' '}
                  {format(selectedDate.to, 'LLL dd, y')}
                </>
              ) : (
                format(selectedDate.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedDate?.from}
            selected={selectedDate}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

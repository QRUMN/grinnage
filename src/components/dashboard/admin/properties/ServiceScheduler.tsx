import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Calendar } from '@/components/ui/Calendar';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Switch } from '@/components/ui/Switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import {
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  Check,
  Repeat,
  Bug,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { propertyApi } from '@/lib/api/property';
import { cn } from '@/lib/utils';

interface ServiceSchedulerProps {
  propertyId: string;
  onScheduled?: () => void;
}

const SERVICE_TYPES = [
  { id: 'general', name: 'General Pest Control' },
  { id: 'termite', name: 'Termite Treatment' },
  { id: 'mosquito', name: 'Mosquito Control' },
  { id: 'rodent', name: 'Rodent Control' },
  { id: 'bed-bugs', name: 'Bed Bug Treatment' },
  { id: 'ant', name: 'Ant Control' },
  { id: 'cockroach', name: 'Cockroach Control' },
];

const RECURRING_PATTERNS = [
  { id: 'none', name: 'One-time Service' },
  { id: 'weekly', name: 'Weekly' },
  { id: 'biweekly', name: 'Bi-weekly' },
  { id: 'monthly', name: 'Monthly' },
  { id: 'quarterly', name: 'Quarterly' },
  { id: 'annually', name: 'Annually' },
];

export function ServiceScheduler({ propertyId, onScheduled }: ServiceSchedulerProps) {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState('09:00');
  const [isRecurring, setIsRecurring] = React.useState(false);
  const [recurringPattern, setRecurringPattern] = React.useState('none');
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState('');

  const { data: availableSlots, isLoading: slotsLoading } = useQuery({
    queryKey: ['available-slots', selectedDate],
    queryFn: () =>
      propertyApi.getAvailableTimeSlots(propertyId, selectedDate),
    enabled: !!selectedDate,
  });

  const { data: propertyDetails } = useQuery({
    queryKey: ['property-details', propertyId],
    queryFn: () => propertyApi.getPropertyDetails(propertyId),
  });

  const scheduleMutation = useMutation({
    mutationFn: (data: any) => propertyApi.scheduleService(propertyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['property-services']);
      toast.success('Service scheduled successfully');
      onScheduled?.();
    },
    onError: () => {
      toast.error('Failed to schedule service');
    },
  });

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const serviceData = {
      date: selectedDate,
      time: selectedTime,
      services: selectedServices,
      notes,
      recurring: isRecurring ? {
        pattern: recurringPattern,
        startDate: selectedDate,
      } : null,
    };

    scheduleMutation.mutate(serviceData);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
            
            {selectedDate && (
              <div className="space-y-2">
                <FormLabel>Available Time Slots</FormLabel>
                <Select
                  value={selectedTime}
                  onValueChange={setSelectedTime}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots?.map((slot) => (
                      <SelectItem key={slot.time} value={slot.time}>
                        {format(new Date(`2000-01-01T${slot.time}`), 'h:mm a')}
                        {slot.limited && ' (Limited Availability)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Service Details</h3>
          <div className="space-y-4">
            <div>
              <FormLabel>Service Types</FormLabel>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {SERVICE_TYPES.map((service) => (
                  <Button
                    key={service.id}
                    variant={selectedServices.includes(service.id) ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => {
                      setSelectedServices((prev) =>
                        prev.includes(service.id)
                          ? prev.filter((id) => id !== service.id)
                          : [...prev, service.id]
                      );
                    }}
                  >
                    <Bug className="mr-2 h-4 w-4" />
                    {service.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel>Recurring Service</FormLabel>
                <Switch
                  checked={isRecurring}
                  onCheckedChange={setIsRecurring}
                />
              </div>
              
              {isRecurring && (
                <Select
                  value={recurringPattern}
                  onValueChange={setRecurringPattern}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    {RECURRING_PATTERNS.map((pattern) => (
                      <SelectItem key={pattern.id} value={pattern.id}>
                        <div className="flex items-center">
                          <Repeat className="mr-2 h-4 w-4" />
                          {pattern.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-2">
              <FormLabel>Notes</FormLabel>
              <Textarea
                placeholder="Add any special instructions or notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Service Summary</h4>
            <p className="text-sm text-muted-foreground">
              {propertyDetails?.address}
            </p>
          </div>
          <Button
            onClick={handleSchedule}
            disabled={!selectedDate || !selectedTime || selectedServices.length === 0}
            className="flex items-center space-x-2"
          >
            <CalendarIcon className="h-4 w-4" />
            <span>Schedule Service</span>
          </Button>
        </div>
        
        {selectedDate && selectedTime && selectedServices.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>
                {format(selectedDate, 'PPP')} at{' '}
                {format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((serviceId) => {
                const service = SERVICE_TYPES.find((s) => s.id === serviceId);
                return (
                  <Badge key={serviceId} variant="secondary">
                    {service?.name}
                  </Badge>
                );
              })}
            </div>
            {isRecurring && (
              <div className="flex items-center space-x-2 text-sm">
                <Repeat className="h-4 w-4" />
                <span>
                  {RECURRING_PATTERNS.find((p) => p.id === recurringPattern)?.name}
                </span>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

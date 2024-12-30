import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  Calendar,
  User,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { toast } from 'sonner';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { propertyApi } from '@/lib/api/property';

interface Technician {
  id: string;
  name: string;
  specialties: string[];
  availability: {
    [key: string]: {
      start: string;
      end: string;
      breaks: { start: string; end: string }[];
    };
  };
  currentLocation?: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
}

interface Appointment {
  id: string;
  technicianId: string;
  propertyId: string;
  clientName: string;
  serviceType: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  address: string;
  notes?: string;
}

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

export function TechnicianScheduling() {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTechnician, setSelectedTechnician] = React.useState<string | null>(null);
  const [isAddingAppointment, setIsAddingAppointment] = React.useState(false);
  const [weekStartDate, setWeekStartDate] = React.useState(startOfWeek(new Date()));

  const { data: technicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: () => propertyApi.getTechnicians(),
  });

  const { data: appointments } = useQuery({
    queryKey: ['appointments', weekStartDate, selectedTechnician],
    queryFn: () =>
      propertyApi.getAppointments({
        startDate: weekStartDate,
        technicianId: selectedTechnician,
      }),
  });

  const scheduleAppointmentMutation = useMutation({
    mutationFn: (data: Partial<Appointment>) =>
      propertyApi.scheduleAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast.success('Appointment scheduled successfully');
      setIsAddingAppointment(false);
    },
    onError: () => {
      toast.error('Failed to schedule appointment');
    },
  });

  const updateAppointmentStatusMutation = useMutation({
    mutationFn: (data: { id: string; status: Appointment['status'] }) =>
      propertyApi.updateAppointmentStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast.success('Appointment status updated');
    },
    onError: () => {
      toast.error('Failed to update appointment status');
    },
  });

  const getAppointmentsForDateAndTechnician = (
    date: Date,
    technicianId: string
  ) => {
    return appointments?.filter(
      (apt: Appointment) =>
        isSameDay(new Date(apt.date), date) && apt.technicianId === technicianId
    );
  };

  const renderWeeklyCalendar = () => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));

    return (
      <div className="grid grid-cols-8 gap-4">
        {/* Time slots column */}
        <div className="space-y-2">
          <div className="h-20" /> {/* Header spacing */}
          {TIME_SLOTS.map((time) => (
            <div
              key={time}
              className="h-20 flex items-center justify-end pr-2 text-sm text-muted-foreground"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {days.map((day) => (
          <div key={day.toString()} className="space-y-2">
            <div className="text-center p-2">
              <div className="font-medium">{format(day, 'EEE')}</div>
              <div
                className={`text-2xl ${
                  isSameDay(day, new Date())
                    ? 'text-primary font-bold'
                    : ''
                }`}
              >
                {format(day, 'd')}
              </div>
            </div>

            {TIME_SLOTS.map((time) => {
              const appointments = technicians?.map((tech: Technician) =>
                getAppointmentsForDateAndTechnician(day, tech.id)
              ).flat();

              const appointmentAtTime = appointments?.find(
                (apt: Appointment) => apt.startTime === time
              );

              return (
                <div
                  key={`${day}-${time}`}
                  className={`h-20 border rounded-md p-1 ${
                    appointmentAtTime
                      ? 'bg-primary/10'
                      : 'hover:bg-muted/50 cursor-pointer'
                  }`}
                  onClick={() => {
                    if (!appointmentAtTime) {
                      setSelectedDate(day);
                      setIsAddingAppointment(true);
                    }
                  }}
                >
                  {appointmentAtTime && (
                    <div className="h-full p-2 text-sm">
                      <div className="font-medium truncate">
                        {appointmentAtTime.clientName}
                      </div>
                      <div className="text-muted-foreground truncate">
                        {appointmentAtTime.serviceType}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderTechnicianList = () => (
    <div className="space-y-4">
      {technicians?.map((technician: Technician) => (
        <Card
          key={technician.id}
          className={`p-4 cursor-pointer transition-colors ${
            selectedTechnician === technician.id
              ? 'border-primary'
              : 'hover:border-primary/50'
          }`}
          onClick={() => setSelectedTechnician(technician.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{technician.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {technician.availability[format(new Date(), 'EEEE')]?.start} -{' '}
                      {technician.availability[format(new Date(), 'EEEE')]?.end}
                    </span>
                  </div>
                  {technician.currentLocation && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        Last updated:{' '}
                        {format(
                          new Date(technician.currentLocation.lastUpdated),
                          'p'
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {technician.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Technician Scheduling</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setWeekStartDate(addDays(weekStartDate, -7));
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setWeekStartDate(addDays(weekStartDate, 7));
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setIsAddingAppointment(true)}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Appointment</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
        <div className="space-y-6">
          <Card className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium">Technicians</h3>
              <p className="text-sm text-muted-foreground">
                Select a technician to view their schedule
              </p>
            </div>
          </Card>
          {renderTechnicianList()}
        </div>

        <Card className="p-6 overflow-x-auto">
          {renderWeeklyCalendar()}
        </Card>
      </div>

      <Dialog
        open={isAddingAppointment}
        onClose={() => setIsAddingAppointment(false)}
      >
        <DialogHeader>
          <DialogTitle>Schedule Appointment</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Client</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Client options */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Service options */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={format(selectedDate, 'yyyy-MM-dd')}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Input placeholder="Add any special instructions or notes" />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsAddingAppointment(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle appointment scheduling
                }}
              >
                Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

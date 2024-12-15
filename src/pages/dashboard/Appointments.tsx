import React from 'react';
import { Clock } from 'lucide-react';
import { AppointmentList } from '../../components/dashboard/appointments/AppointmentList';
import { AppointmentCalendar } from '../../components/dashboard/appointments/AppointmentCalendar';
import { ScheduleButton } from '../../components/dashboard/appointments/ScheduleButton';

export const Appointments = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Manage your service appointments</p>
        </div>
        <ScheduleButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppointmentCalendar />
        </div>
        <div>
          <AppointmentList />
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';
import { formatDate } from '../../../utils/date';

export const AppointmentCalendar = () => {
  const appointments = [
    {
      id: 1,
      date: '2024-03-15',
      time: '10:00 AM',
      type: 'Monthly Service',
      status: 'scheduled'
    }
  ];

  return (
    <DashboardCard title="Service Calendar">
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 border dark:border-dark-700 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <Calendar className="w-8 h-8 text-[#56e39f]" />
              <div>
                <p className="font-medium">{appointment.type}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatDate(appointment.date)} at {appointment.time}</span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#56e39f]/10 text-[#56e39f] rounded-full text-sm">
              {appointment.status}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
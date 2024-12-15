import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { formatDate } from '../../../utils/date';

export const AppointmentList = () => {
  const appointments = [
    {
      id: 1,
      type: 'Monthly Service',
      date: '2024-03-15',
      time: '10:00 AM',
      location: '123 Main St',
      status: 'upcoming'
    }
  ];

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id}
            className="border dark:border-dark-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{appointment.type}</h3>
              <span className="text-sm text-[#56e39f]">{appointment.status}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{formatDate(appointment.date)} at {appointment.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{appointment.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
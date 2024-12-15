import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';

interface Appointment {
  id: string;
  location: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const CommercialAppointments = () => {
  const appointments: Appointment[] = [
    {
      id: '1',
      location: 'Main Office',
      date: '2024-03-15',
      time: '10:00 AM',
      type: 'Monthly Inspection',
      status: 'scheduled'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Service Schedule</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage appointments across all locations</p>
        </div>
        <button className="btn-primary">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Service
        </button>
      </div>

      <DashboardCard>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border dark:border-dark-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Calendar className="w-8 h-8 text-[#56e39f]" />
                <div>
                  <h3 className="font-medium">{appointment.type}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{appointment.date} at {appointment.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  appointment.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-800'
                    : appointment.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {appointment.status}
                </span>
                <button className="text-gray-500 hover:text-gray-700">
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};
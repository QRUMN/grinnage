import React from 'react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const AppointmentCalendar = () => {
  const appointments: Appointment[] = [
    {
      id: '1',
      date: '2024-03-15',
      time: '10:00 AM',
      type: 'Monthly Inspection',
      status: 'scheduled',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Appointments</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Upcoming Services</h2>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
            Schedule New
          </button>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div>
                <p className="font-medium">{appointment.type}</p>
                <p className="text-sm text-gray-500">
                  {appointment.date} at {appointment.time}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    appointment.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-800'
                      : appointment.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {appointment.status}
                </span>
                <button className="text-gray-500 hover:text-gray-700">
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
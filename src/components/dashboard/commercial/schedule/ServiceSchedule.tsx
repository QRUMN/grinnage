import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock4
} from 'lucide-react';

export const ServiceSchedule = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Service Schedule</h2>
          <p className="text-sm text-gray-500">View and manage upcoming services</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scheduleStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.iconBg} mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-medium">January 2024</h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm font-medium text-primary border-b-2 border-primary">
                Month
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-primary">
                Week
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-primary">
                Day
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {scheduledServices.map((service, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50">
                <div className={`p-3 rounded-lg ${service.statusBg}`}>
                  {service.statusIcon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{service.type}</h4>
                      <div className="flex items-center mt-1 space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {service.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.time}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${service.statusColor}`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {service.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {service.assignedTo}
                    </div>
                  </div>
                  {service.notes && (
                    <p className="mt-2 text-sm text-gray-500">
                      {service.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const scheduleStats = [
  {
    icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
    iconBg: 'bg-green-100',
    label: 'Completed Services',
    value: '28'
  },
  {
    icon: <Clock4 className="h-6 w-6 text-blue-500" />,
    iconBg: 'bg-blue-100',
    label: 'Scheduled Services',
    value: '12'
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    iconBg: 'bg-yellow-100',
    label: 'Pending Confirmation',
    value: '5'
  }
];

const scheduledServices = [
  {
    type: 'Regular Maintenance',
    date: 'Jan 15, 2024',
    time: '9:00 AM',
    location: 'Main Office',
    assignedTo: 'John Smith',
    status: 'Confirmed',
    statusColor: 'bg-green-100 text-green-800',
    statusBg: 'bg-green-100',
    statusIcon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    notes: 'Monthly HVAC system inspection and maintenance.'
  },
  {
    type: 'Emergency Repair',
    date: 'Jan 16, 2024',
    time: '2:30 PM',
    location: 'Warehouse A',
    assignedTo: 'Sarah Johnson',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-800',
    statusBg: 'bg-yellow-100',
    statusIcon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    notes: 'Urgent repair needed for loading dock equipment.'
  },
  {
    type: 'Quarterly Inspection',
    date: 'Jan 18, 2024',
    time: '11:00 AM',
    location: 'Downtown Branch',
    assignedTo: 'Mike Wilson',
    status: 'Scheduled',
    statusColor: 'bg-blue-100 text-blue-800',
    statusBg: 'bg-blue-100',
    statusIcon: <Clock4 className="h-5 w-5 text-blue-500" />
  }
];

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  BarChart3
} from 'lucide-react';

export const LocationDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/commercial/locations')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Main Office</h2>
              <p className="text-sm text-gray-500">Corporate Office</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-sm text-gray-500">
                      123 Business Ave, Suite 100<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-sm text-gray-500">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-500">mainoffice@company.com</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Staff Members</p>
                    <p className="text-sm text-gray-500">12 Active Members</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Next Service</p>
                    <p className="text-sm text-gray-500">Dec 20, 2024</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Contract Type</p>
                    <p className="text-sm text-gray-500">Annual Service Agreement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Recent Activity</h3>
              <button className="text-sm text-primary hover:text-primary-dark">View All</button>
            </div>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`p-2 rounded-lg ${activity.iconBg} mr-3`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${stat.iconBg} mr-3`}>
                      {stat.icon}
                    </div>
                    <span className="text-sm text-gray-500">{stat.label}</span>
                  </div>
                  <span className="text-sm font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Assigned Staff</h3>
            <div className="space-y-4">
              {assignedStaff.map((staff, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{staff.name}</p>
                      <p className="text-xs text-gray-500">{staff.role}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${staff.statusColor}`}>
                    {staff.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const activities = [
  {
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    iconBg: 'bg-green-100',
    title: 'Service Completed',
    description: 'Regular maintenance service completed by John Smith',
    time: '2h ago'
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    iconBg: 'bg-yellow-100',
    title: 'Maintenance Alert',
    description: 'HVAC system requires inspection',
    time: '1d ago'
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100',
    title: 'Service Scheduled',
    description: 'Next maintenance service scheduled for Dec 20',
    time: '2d ago'
  }
];

const stats = [
  {
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    iconBg: 'bg-green-100',
    label: 'Completed Services',
    value: '24'
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    iconBg: 'bg-yellow-100',
    label: 'Active Alerts',
    value: '2'
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100',
    label: 'Service Efficiency',
    value: '98%'
  }
];

const assignedStaff = [
  {
    name: 'John Smith',
    role: 'Location Manager',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    name: 'Sarah Johnson',
    role: 'Service Technician',
    status: 'On Site',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Mike Wilson',
    role: 'Service Coordinator',
    status: 'Off Duty',
    statusColor: 'bg-gray-100 text-gray-800'
  }
];

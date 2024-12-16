import React from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Filter,
  MapPin,
  MoreVertical,
  Search,
  Settings,
  Shield,
  ThumbsUp,
  Timer,
  XCircle
} from 'lucide-react';

export const AlertsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Alerts & Notifications</h2>
          <p className="text-sm text-gray-500">Monitor and manage system alerts</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Settings className="h-4 w-4 mr-2" />
            Alert Settings
          </button>
          <button className="relative inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            <span className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
              3
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {alertStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.iconBg} mr-3`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="px-3 py-1 text-sm font-medium text-primary border-b-2 border-primary">
                All Alerts
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-primary">
                High Priority
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-primary">
                Unresolved
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {alerts.map((alert, index) => (
            <div key={index} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${alert.iconBg}`}>
                    {alert.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${alert.priorityColor}`}>
                        {alert.priority}
                      </span>
                      <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{alert.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {alert.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {alert.time}
                      </div>
                      {alert.assignedTo && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Shield className="h-4 w-4 mr-1" />
                          {alert.assignedTo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-primary hover:text-primary-dark font-medium">
                    View Details
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const alertStats = [
  {
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    iconBg: 'bg-red-100',
    label: 'High Priority',
    value: '3'
  },
  {
    icon: <Clock className="h-5 w-5 text-yellow-500" />,
    iconBg: 'bg-yellow-100',
    label: 'Pending',
    value: '8'
  },
  {
    icon: <Timer className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100',
    label: 'In Progress',
    value: '5'
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    iconBg: 'bg-green-100',
    label: 'Resolved',
    value: '24'
  }
];

const alerts = [
  {
    title: 'HVAC System Alert',
    description: 'Temperature fluctuation detected in main server room. Immediate attention required.',
    priority: 'High Priority',
    priorityColor: 'bg-red-100 text-red-800',
    location: 'Main Office',
    time: '10 minutes ago',
    assignedTo: 'John Smith',
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    iconBg: 'bg-red-100'
  },
  {
    title: 'Maintenance Due',
    description: 'Quarterly maintenance inspection due for warehouse loading equipment.',
    priority: 'Medium',
    priorityColor: 'bg-yellow-100 text-yellow-800',
    location: 'Warehouse A',
    time: '2 hours ago',
    icon: <Clock className="h-5 w-5 text-yellow-500" />,
    iconBg: 'bg-yellow-100'
  },
  {
    title: 'Security System Update',
    description: 'Required security system update pending installation.',
    priority: 'Low',
    priorityColor: 'bg-blue-100 text-blue-800',
    location: 'All Locations',
    time: '1 day ago',
    icon: <Shield className="h-5 w-5 text-blue-500" />,
    iconBg: 'bg-blue-100'
  }
];

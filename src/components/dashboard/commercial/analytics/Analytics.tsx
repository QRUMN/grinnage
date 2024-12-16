import React from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Analytics & Reports</h2>
          <p className="text-sm text-gray-500">Track business performance and metrics</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${metric.iconBg}`}>
                {metric.icon}
              </div>
              {metric.trend && (
                <div className={`flex items-center text-sm ${metric.trend.color}`}>
                  {metric.trend.direction === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {metric.trend.value}
                </div>
              )}
            </div>
            <h3 className="text-2xl font-semibold mt-4">{metric.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Revenue by Location</h3>
            <select className="px-3 py-1 border rounded-lg text-sm">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 flex items-center justify-center border rounded-lg">
            {/* Placeholder for chart */}
            <p className="text-gray-500">Revenue Chart</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Service Performance</h3>
            <select className="px-3 py-1 border rounded-lg text-sm">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 flex items-center justify-center border rounded-lg">
            {/* Placeholder for chart */}
            <p className="text-gray-500">Performance Chart</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium">Location Analytics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satisfaction
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locationAnalytics.map((location, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {location.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {location.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{location.revenue}</div>
                    <div className={`flex items-center text-sm ${location.revenueTrend.color}`}>
                      {location.revenueTrend.direction === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {location.revenueTrend.value}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{location.services}</div>
                    <div className="text-sm text-gray-500">Completed</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${location.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{location.efficiency}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${location.satisfactionColor}`}>
                      {location.satisfaction}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const performanceMetrics = [
  {
    icon: <DollarSign className="h-6 w-6 text-green-500" />,
    iconBg: 'bg-green-100',
    label: 'Total Revenue',
    value: '$128.5k',
    trend: {
      direction: 'up',
      value: '12%',
      color: 'text-green-500'
    }
  },
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    iconBg: 'bg-blue-100',
    label: 'Active Clients',
    value: '24',
    trend: {
      direction: 'up',
      value: '4%',
      color: 'text-green-500'
    }
  },
  {
    icon: <Clock className="h-6 w-6 text-yellow-500" />,
    iconBg: 'bg-yellow-100',
    label: 'Avg. Response Time',
    value: '2.4h',
    trend: {
      direction: 'down',
      value: '8%',
      color: 'text-green-500'
    }
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
    iconBg: 'bg-purple-100',
    label: 'Service Efficiency',
    value: '94%',
    trend: {
      direction: 'up',
      value: '3%',
      color: 'text-green-500'
    }
  }
];

const locationAnalytics = [
  {
    name: 'Main Office',
    type: 'Corporate Office',
    revenue: '$45,250',
    revenueTrend: {
      direction: 'up',
      value: '8%',
      color: 'text-green-500'
    },
    services: '48',
    efficiency: 96,
    satisfaction: 'Excellent',
    satisfactionColor: 'bg-green-100 text-green-800'
  },
  {
    name: 'Warehouse A',
    type: 'Distribution Center',
    revenue: '$38,800',
    revenueTrend: {
      direction: 'up',
      value: '5%',
      color: 'text-green-500'
    },
    services: '36',
    efficiency: 92,
    satisfaction: 'Good',
    satisfactionColor: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Downtown Branch',
    type: 'Retail',
    revenue: '$44,450',
    revenueTrend: {
      direction: 'down',
      value: '2%',
      color: 'text-red-500'
    },
    services: '42',
    efficiency: 88,
    satisfaction: 'Good',
    satisfactionColor: 'bg-blue-100 text-blue-800'
  }
];

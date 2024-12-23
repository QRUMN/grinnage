import React from 'react';
import { useAtomValue } from 'jotai';
import { authStateAtom } from '@/store/auth';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const ResidentialDashboard = () => {
  const { user } = useAtomValue(authStateAtom);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-gray-600">Here's what's happening with your property</p>
        </div>
        <Badge variant="success">Residential Account</Badge>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Service */}
        <Card className="p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Next Service</h2>
          <div className="space-y-4">
            <div>
              <p className="text-base font-medium text-gray-900">Lawn Maintenance</p>
              <p className="text-sm text-gray-600">January 15, 2024</p>
            </div>
          </div>
        </Card>

        {/* Active Services */}
        <Card className="p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Services</h2>
          <div className="space-y-4">
            <div>
              <p className="text-base font-medium text-gray-900">Services this month</p>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pest Control</span>
                  <Badge variant="success">Completed</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lawn Care</span>
                  <Badge variant="info">Scheduled</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Service Requests */}
        <Card className="p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Requests</h2>
          <div className="space-y-4">
            <div>
              <p className="text-base font-medium text-gray-900">Pending requests</p>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Emergency Plumbing</span>
                  <Badge variant="warning">Pending</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { date: 'December 20, 2023', status: 'Completed' },
            { date: 'December 19, 2023', status: 'Completed' },
            { date: 'December 18, 2023', status: 'Completed' },
            { date: 'December 17, 2023', status: 'Completed' },
          ].map((activity, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">{activity.date}</span>
              <Badge variant="success">Completed</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Services */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Services</h2>
        <div className="space-y-4">
          {[
            { date: 'January 15, 2024', service: 'Regular Maintenance' },
            { date: 'January 22, 2024', service: 'Pest Control' },
          ].map((service, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">{service.service}</p>
                <p className="text-sm text-gray-600">{service.date}</p>
              </div>
              <Badge variant="info">Scheduled</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

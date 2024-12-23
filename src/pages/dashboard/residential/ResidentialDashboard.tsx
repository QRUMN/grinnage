import React from 'react';
import { useAtomValue } from 'jotai';
import { authStateAtom } from '../../../store/auth';
import { Card } from '../../../components/ui/Card';
import { ScrollArea } from '../../../components/ui/ScrollArea';
import { Badge } from '../../../components/ui/Badge';

export const ResidentialDashboard = () => {
  const { user } = useAtomValue(authStateAtom);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-gray-500">Here's what's happening with your property</p>
        </div>
        <Badge variant="success">Residential Account</Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Next Service</h3>
          <p className="text-2xl font-bold mt-2">Jan 15, 2024</p>
          <p className="text-sm text-gray-500">Lawn Maintenance</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Active Services</h3>
          <p className="text-2xl font-bold mt-2">3</p>
          <p className="text-sm text-gray-500">Services this month</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Service Requests</h3>
          <p className="text-2xl font-bold mt-2">1</p>
          <p className="text-sm text-gray-500">Pending requests</p>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Lawn Service Completed</p>
                  <p className="text-sm text-gray-500">December {20 - i}, 2023</p>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Upcoming Services */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Services</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Lawn Maintenance</p>
              <p className="text-sm text-gray-500">January 15, 2024</p>
            </div>
            <Badge variant="info">Scheduled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Tree Trimming</p>
              <p className="text-sm text-gray-500">January 22, 2024</p>
            </div>
            <Badge variant="info">Scheduled</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

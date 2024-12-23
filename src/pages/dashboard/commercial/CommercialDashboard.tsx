import React from 'react';
import { useAtomValue } from 'jotai';
import { authStateAtom } from '../../../store/auth';
import { Card } from '../../../components/ui/Card';
import { ScrollArea } from '../../../components/ui/ScrollArea';
import { Badge } from '../../../components/ui/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 5000 },
  { month: 'Apr', value: 4500 },
  { month: 'May', value: 6000 },
  { month: 'Jun', value: 5500 },
];

export const CommercialDashboard = () => {
  const { user } = useAtomValue(authStateAtom);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-gray-500">Commercial Property Management Overview</p>
        </div>
        <Badge variant="info">Commercial Account</Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Properties</h3>
          <p className="text-2xl font-bold mt-2">12</p>
          <p className="text-sm text-gray-500">Active properties</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Active Contracts</h3>
          <p className="text-2xl font-bold mt-2">8</p>
          <p className="text-sm text-gray-500">Current month</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Service Requests</h3>
          <p className="text-2xl font-bold mt-2">5</p>
          <p className="text-sm text-gray-500">Pending requests</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold mt-2">$45.2K</p>
          <p className="text-sm text-text-gray-500">This month</p>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#56e39f" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Active Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Active Properties</h2>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Property {i + 1}</p>
                    <p className="text-sm text-gray-500">123 Business Ave</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Recent Service Requests */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Service Requests</h2>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Maintenance Request</p>
                    <p className="text-sm text-gray-500">Property {i + 1}</p>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

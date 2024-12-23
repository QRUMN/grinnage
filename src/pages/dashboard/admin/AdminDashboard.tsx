import React from 'react';
import { useAtomValue } from 'jotai';
import { authStateAtom } from '../../../store/auth';
import { Card } from '../../../components/ui/Card';
import { ScrollArea } from '../../../components/ui/ScrollArea';
import { Badge } from '../../../components/ui/Badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Residential', value: 400 },
  { name: 'Commercial', value: 300 },
];

const COLORS = ['#56e39f', '#0496FF'];

export const AdminDashboard = () => {
  const { user } = useAtomValue(authStateAtom);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">System Overview and Management</p>
        </div>
        <Badge variant="destructive">Admin Access</Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
          <p className="text-sm text-gray-500">Active accounts</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">New Users</h3>
          <p className="text-2xl font-bold mt-2">56</p>
          <p className="text-sm text-gray-500">This month</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Active Services</h3>
          <p className="text-2xl font-bold mt-2">892</p>
          <p className="text-sm text-gray-500">In progress</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">$234.5K</p>
          <p className="text-sm text-gray-500">This month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent System Logs */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">System Logs</h2>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">System Update</p>
                    <p className="text-sm text-gray-500">December {20 - i}, 2023</p>
                  </div>
                  <Badge variant="secondary">System</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">New User Registration</p>
                  <p className="text-sm text-gray-500">user{i + 1}@example.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="info">New</Badge>
                  <span className="text-sm text-gray-500">2 mins ago</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

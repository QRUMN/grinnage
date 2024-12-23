import React from 'react';
import { Card } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '1 Dec', amount: 1000 },
  { date: '5 Dec', amount: 1200 },
  { date: '10 Dec', amount: 900 },
  { date: '15 Dec', amount: 1500 },
  { date: '20 Dec', amount: 1300 },
  { date: '25 Dec', amount: 1800 },
];

export const WalletBalance = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm text-gray-500">Available Balance</p>
          <h3 className="text-3xl font-bold">$1,800.00</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-green-600 font-medium">+$800.00</p>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#56e39f"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

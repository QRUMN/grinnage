import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const AdminWallet = () => {
  const transactions = [
    {
      id: 1,
      date: '2023-12-23',
      type: 'Payment Received',
      amount: 1500.00,
      status: 'completed',
      customer: 'John Doe',
    },
    {
      id: 2,
      date: '2023-12-22',
      type: 'Refund Issued',
      amount: -250.00,
      status: 'completed',
      customer: 'Jane Smith',
    },
    {
      id: 3,
      date: '2023-12-21',
      type: 'Payment Received',
      amount: 750.00,
      status: 'completed',
      customer: 'Bob Wilson',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Overview</h1>
        <Badge variant="success">Admin Wallet</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Balance</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">$25,750.00</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Last updated: Dec 23, 2023</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">$12,500.00</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">December 2023</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pending Payments</h3>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">$3,250.00</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">5 pending transactions</p>
        </Card>
      </div>

      <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{transaction.type}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {transaction.customer} • {transaction.date}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-semibold ${
                  transaction.amount >= 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <Badge variant="success">Completed</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

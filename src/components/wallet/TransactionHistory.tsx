import React from 'react';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Badge } from '@/components/ui/Badge';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const mockTransactions = [
  {
    id: 1,
    type: 'credit',
    amount: 500,
    description: 'Payment received',
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: 2,
    type: 'debit',
    amount: 150,
    description: 'Service payment',
    date: '2024-01-14',
    status: 'completed',
  },
  {
    id: 3,
    type: 'credit',
    amount: 1000,
    description: 'Wallet top-up',
    date: '2024-01-13',
    status: 'completed',
  },
  {
    id: 4,
    type: 'debit',
    amount: 75,
    description: 'Monthly maintenance',
    date: '2024-01-12',
    status: 'pending',
  },
];

export const TransactionHistory = () => {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              {transaction.type === 'credit' ? (
                <div className="p-2 bg-green-100 rounded-full">
                  <ArrowDownRight className="h-4 w-4 text-green-600" />
                </div>
              ) : (
                <div className="p-2 bg-red-100 rounded-full">
                  <ArrowUpRight className="h-4 w-4 text-red-600" />
                </div>
              )}
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
              </p>
              <Badge 
                variant={transaction.status === 'completed' ? 'success' : 'warning'}
                className="mt-1"
              >
                {transaction.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

import React from 'react';
import { FileText, Download } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';
import { formatDate } from '../../../utils/date';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'overdue';
}

export const InvoiceList = () => {
  const invoices: Invoice[] = [
    {
      id: '1',
      date: '2024-03-01',
      amount: 199,
      description: 'Monthly Pest Control Service - March',
      status: 'pending'
    },
    {
      id: '2',
      date: '2024-02-01',
      amount: 199,
      description: 'Monthly Pest Control Service - February',
      status: 'paid'
    }
  ];

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  return (
    <DashboardCard title="Recent Invoices">
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-4 border dark:border-dark-700 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-[#56e39f]" />
              <div>
                <p className="font-medium">{invoice.description}</p>
                <p className="text-sm text-gray-500">{formatDate(invoice.date)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">${invoice.amount}</p>
                <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>
              <button
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                title="Download Invoice"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
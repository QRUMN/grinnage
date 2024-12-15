import React from 'react';
import { CreditCard, FileText, DollarSign } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';

interface Invoice {
  id: string;
  location: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

export const CommercialBilling = () => {
  const invoices: Invoice[] = [
    {
      id: '1',
      location: 'Main Office',
      amount: 1999,
      date: '2024-03-01',
      status: 'pending',
      description: 'Monthly Service - March 2024'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage payments and invoices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard>
          <div className="flex items-center space-x-4">
            <DollarSign className="w-8 h-8 text-[#56e39f]" />
            <div>
              <p className="text-sm text-gray-500">Total Outstanding</p>
              <p className="text-2xl font-bold">$4,999</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center space-x-4">
            <CreditCard className="w-8 h-8 text-[#56e39f]" />
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="text-lg font-medium">VISA ending in 4242</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-[#56e39f]" />
            <div>
              <p className="text-sm text-gray-500">Next Invoice</p>
              <p className="text-lg font-medium">April 1, 2024</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Recent Invoices">
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 border dark:border-dark-700 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{invoice.description}</h3>
                <p className="text-sm text-gray-500">{invoice.location}</p>
                <p className="text-sm text-gray-500">{invoice.date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium">${invoice.amount}</p>
                <span className={`inline-block px-2 py-1 text-sm rounded-full ${
                  invoice.status === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : invoice.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};
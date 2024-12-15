import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import type { Invoice, PaymentMethod } from '../../types/payment';

export const PaymentDashboard = () => {
  const paymentMethods: PaymentMethod[] = [
    { id: '1', type: 'card', last4: '4242', isDefault: true },
  ];

  const invoices: Invoice[] = [
    {
      id: '1',
      userId: '1',
      amount: 199,
      status: 'pending',
      dueDate: '2024-03-15',
      serviceDate: '2024-03-01',
      description: 'Monthly Pest Control Service',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Billing & Payments</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Payment Methods</h2>
          <button className="flex items-center text-blue-900 hover:text-blue-700">
            <Plus className="w-5 h-5 mr-1" />
            Add New
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded">
              <div className="flex items-center">
                <CreditCard className="w-6 h-6 mr-3" />
                <div>
                  <p className="font-medium">
                    {method.type === 'card' ? 'Credit Card' : 'Bank Account'}
                  </p>
                  <p className="text-sm text-gray-500">Ending in {method.last4}</p>
                </div>
              </div>
              {method.isDefault && (
                <span className="text-sm text-blue-900">Default</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Invoices</h2>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 border rounded">
              <div>
                <p className="font-medium">{invoice.description}</p>
                <p className="text-sm text-gray-500">Due {invoice.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${invoice.amount}</p>
                <span className="text-sm px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">AutoPay</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Automatic Payments</p>
            <p className="text-sm text-gray-500">Pay invoices automatically when due</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  isDefault: boolean;
  expiryDate?: string;
}

export const PaymentMethods = () => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      isDefault: true,
      expiryDate: '12/25'
    }
  ];

  return (
    <DashboardCard title="Payment Methods">
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border dark:border-dark-700 rounded-lg"
          >
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 text-[#56e39f] mr-3" />
              <div>
                <p className="font-medium">
                  {method.type === 'card' ? 'Credit Card' : 'Bank Account'}
                </p>
                <p className="text-sm text-gray-500">
                  Ending in {method.last4}
                  {method.expiryDate && ` • Expires ${method.expiryDate}`}
                </p>
              </div>
            </div>
            {method.isDefault && (
              <span className="text-sm text-[#56e39f]">Default</span>
            )}
          </div>
        ))}

        <button className="flex items-center text-[#56e39f] hover:text-[#33d789] font-medium">
          <Plus className="w-5 h-5 mr-1" />
          Add Payment Method
        </button>
      </div>
    </DashboardCard>
  );
};
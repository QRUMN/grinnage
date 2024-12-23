import React from 'react';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Badge } from '@/components/ui/Badge';
import { CreditCard, Trash2 } from 'lucide-react';

const mockPaymentMethods = [
  {
    id: 1,
    type: 'Visa',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '24',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Mastercard',
    last4: '5555',
    expiryMonth: '08',
    expiryYear: '25',
    isDefault: false,
  },
];

export const PaymentMethodList = () => {
  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-4">
        {mockPaymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <CreditCard className="h-6 w-6 text-gray-500" />
              <div>
                <p className="font-medium">
                  {method.type} •••• {method.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {method.expiryMonth}/{method.expiryYear}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {method.isDefault && (
                <Badge variant="secondary">Default</Badge>
              )}
              <button 
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                title="Remove payment method"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

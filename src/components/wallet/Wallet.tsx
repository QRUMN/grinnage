import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ScrollArea } from '../ui/ScrollArea';
import { PaymentMethodList } from './PaymentMethodList';
import { TransactionHistory } from './TransactionHistory';
import { WalletBalance } from './WalletBalance';
import { AddPaymentMethod } from './AddPaymentMethod';

export const Wallet = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Wallet</h2>
        <Badge variant="success">Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="md:col-span-2">
          <WalletBalance />
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90">
              Add Funds
            </button>
            <button className="w-full px-4 py-2 text-white bg-secondary rounded-md hover:bg-secondary/90">
              Withdraw
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              View Statement
            </button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Payment Methods</h3>
            <AddPaymentMethod />
          </div>
          <PaymentMethodList />
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Transactions</h3>
          <TransactionHistory />
        </Card>
      </div>
    </div>
  );
};

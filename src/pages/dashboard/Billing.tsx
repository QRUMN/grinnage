import React from 'react';
import { PaymentMethods } from '../../components/dashboard/billing/PaymentMethods';
import { InvoiceList } from '../../components/dashboard/billing/InvoiceList';
import { BillingOverview } from '../../components/dashboard/billing/BillingOverview';

export const Billing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Payments</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your payment methods and view invoices</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BillingOverview />
        </div>
        <div>
          <PaymentMethods />
        </div>
      </div>

      <InvoiceList />
    </div>
  );
};
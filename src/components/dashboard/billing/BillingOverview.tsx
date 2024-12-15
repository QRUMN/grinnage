import React from 'react';
import { CreditCard, Calendar, DollarSign } from 'lucide-react';
import { DashboardCard } from '../common/DashboardCard';

export const BillingOverview = () => {
  return (
    <DashboardCard title="Billing Overview">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-[#56e39f]" />
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="font-medium">Monthly Service</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-[#56e39f]" />
              <div>
                <p className="text-sm text-gray-500">Next Billing Date</p>
                <p className="font-medium">March 15, 2024</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-[#56e39f]" />
              <div>
                <p className="text-sm text-gray-500">Monthly Amount</p>
                <p className="font-medium">$199.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t dark:border-dark-700 pt-6">
          <h3 className="text-lg font-medium mb-4">AutoPay Settings</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Automatic Payments</p>
              <p className="text-sm text-gray-500">Pay invoices automatically when due</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#56e39f] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#56e39f]"></div>
            </label>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  CreditCard,
  Building2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';

export const BillingOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Billing & Invoices</h2>
          <p className="text-sm text-gray-500">Manage your billing and payment history</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <Link
            to="new-invoice"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {billingStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                {stat.icon}
              </div>
              {stat.trend && (
                <div className={`flex items-center text-sm ${stat.trend.color}`}>
                  {stat.trend.direction === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {stat.trend.value}
                </div>
              )}
            </div>
            <h3 className="text-2xl font-semibold mt-4">{stat.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Recent Invoices</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {invoice.number}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{invoice.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : invoice.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {invoice.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const billingStats = [
  {
    icon: <DollarSign className="h-6 w-6 text-green-500" />,
    iconBg: 'bg-green-100',
    label: 'Total Revenue',
    value: '$24,560',
    trend: {
      direction: 'up',
      value: '12%',
      color: 'text-green-500'
    }
  },
  {
    icon: <CreditCard className="h-6 w-6 text-blue-500" />,
    iconBg: 'bg-blue-100',
    label: 'Outstanding Balance',
    value: '$4,890',
    trend: {
      direction: 'down',
      value: '8%',
      color: 'text-red-500'
    }
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
    iconBg: 'bg-purple-100',
    label: 'Average Invoice',
    value: '$1,280',
    trend: {
      direction: 'up',
      value: '3%',
      color: 'text-green-500'
    }
  }
];

const recentInvoices = [
  {
    id: 1,
    number: 'INV-2024-001',
    date: 'Jan 1, 2024',
    location: 'Main Office',
    amount: '$2,400',
    status: 'Paid',
    dueDate: 'Jan 15, 2024'
  },
  {
    id: 2,
    number: 'INV-2024-002',
    date: 'Jan 5, 2024',
    location: 'Warehouse A',
    amount: '$1,800',
    status: 'Pending',
    dueDate: 'Jan 20, 2024'
  },
  {
    id: 3,
    number: 'INV-2024-003',
    date: 'Jan 10, 2024',
    location: 'Downtown Branch',
    amount: '$3,200',
    status: 'Overdue',
    dueDate: 'Jan 25, 2024'
  }
];

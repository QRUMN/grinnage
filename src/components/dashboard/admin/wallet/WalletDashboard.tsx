import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs';
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CreditCard,
  Download,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { WalletStats } from './WalletStats';
import { TransactionHistory } from './TransactionHistory';
import { WalletFilters } from './WalletFilters';
import { PaymentMethods } from './PaymentMethods';
import { walletApi } from '@/lib/api/wallet';
import { formatCurrency } from '@/lib/utils';

export function WalletDashboard() {
  const [filters, setFilters] = React.useState({
    dateRange: {
      from: null,
      to: null,
    },
    type: 'all',
    status: 'all',
    minAmount: '',
    maxAmount: '',
  });

  const { data: walletData, isLoading: walletLoading } = useQuery({
    queryKey: ['wallet-overview'],
    queryFn: () => walletApi.getWalletOverview(),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['wallet-stats', filters],
    queryFn: () => walletApi.getWalletStats(filters),
  });

  const handleExport = async () => {
    try {
      const response = await walletApi.exportTransactions(filters);
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export transactions:', error);
    }
  };

  const quickStats = [
    {
      title: 'Total Balance',
      value: formatCurrency(walletData?.balance || 0),
      change: walletData?.balanceChange,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: 'Total Income',
      value: formatCurrency(stats?.totalIncome || 0),
      change: stats?.incomeChange,
      icon: <ArrowDownLeft className="h-4 w-4" />,
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(stats?.totalExpenses || 0),
      change: stats?.expensesChange,
      icon: <ArrowUpRight className="h-4 w-4" />,
    },
    {
      title: 'Pending Transactions',
      value: stats?.pendingTransactions || 0,
      change: stats?.pendingChange,
      icon: <Clock className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Wallet Management</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center space-x-1"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center space-x-1"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-lg">
                {stat.icon}
              </div>
              {stat.change !== undefined && (
                <div
                  className={`text-sm ${
                    stat.change > 0
                      ? 'text-green-600'
                      : stat.change < 0
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {stat.change > 0 ? '+' : ''}
                  {stat.change}%
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <WalletFilters filters={filters} onFilterChange={setFilters} />

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger
            value="transactions"
            className="flex items-center space-x-1"
          >
            <Clock className="h-4 w-4" />
            <span>Transactions</span>
          </TabsTrigger>
          <TabsTrigger
            value="payment-methods"
            className="flex items-center space-x-1"
          >
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center space-x-1">
            <Filter className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <TransactionHistory filters={filters} />
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <PaymentMethods />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <WalletStats filters={filters} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

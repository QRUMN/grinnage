import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download, Calendar } from 'lucide-react';
import { walletApi } from '@/lib/api/wallet';
import { formatCurrency } from '@/lib/utils';

interface WalletStatsProps {
  filters: {
    dateRange: {
      from: Date | null;
      to: Date | null;
    };
    type: string;
    status: string;
    minAmount: string;
    maxAmount: string;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function WalletStats({ filters }: WalletStatsProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['wallet-analytics', filters],
    queryFn: () => walletApi.getWalletAnalytics(filters),
  });

  const handleExport = async () => {
    try {
      const response = await walletApi.exportAnalytics(filters);
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wallet-analytics-${new Date().toISOString()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export analytics:', error);
    }
  };

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Wallet Analytics</h3>
        <Button
          variant="outline"
          onClick={handleExport}
          className="flex items-center space-x-1"
        >
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Transaction Volume</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="credit"
                stroke="#10B981"
                name="Credits"
              />
              <Line
                type="monotone"
                dataKey="debit"
                stroke="#EF4444"
                name="Debits"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Transaction Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  name,
                }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="white"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {`${name} ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
                outerRadius={80}
                dataKey="value"
              >
                {stats?.distributionData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Monthly Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar dataKey="income" fill="#10B981" name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Key Metrics</h4>
          <div className="grid gap-4 md:grid-cols-2">
            {stats?.metrics.map((metric: any) => (
              <div
                key={metric.label}
                className="p-4 rounded-lg bg-muted/50"
              >
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
                <div className="text-2xl font-bold mt-1">
                  {metric.type === 'currency'
                    ? formatCurrency(metric.value)
                    : metric.type === 'percentage'
                    ? `${metric.value}%`
                    : metric.value}
                </div>
                <div
                  className={`text-sm mt-1 ${
                    metric.change > 0
                      ? 'text-green-600'
                      : metric.change < 0
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {metric.change > 0 ? '+' : ''}
                  {metric.change}% vs last period
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

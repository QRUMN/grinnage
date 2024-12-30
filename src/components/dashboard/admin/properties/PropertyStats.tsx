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
import { propertyApi } from '@/lib/api/property';

interface PropertyStatsProps {
  filters: {
    type: string;
    status: string;
    search: string;
    serviceDate: Date | null;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function PropertyStats({ filters }: PropertyStatsProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['property-analytics', filters],
    queryFn: () => propertyApi.getPropertyAnalytics(filters),
  });

  const handleExport = async () => {
    try {
      const response = await propertyApi.exportAnalytics(filters);
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `property-analytics-${new Date().toISOString()}.pdf`;
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
        <h3 className="text-lg font-semibold">Property Analytics</h3>
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
          <h4 className="text-sm font-medium mb-4">Property Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.propertyDistribution}
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
                {stats?.propertyDistribution.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Service Trends</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.serviceTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="residential"
                stroke="#0088FE"
                name="Residential"
              />
              <Line
                type="monotone"
                dataKey="commercial"
                stroke="#00C49F"
                name="Commercial"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Service Types</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.serviceTypes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0088FE" name="Number of Services" />
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
                <div className="text-2xl font-bold mt-1">{metric.value}</div>
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

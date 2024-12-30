import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
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
import {
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Activity,
  Printer,
} from 'lucide-react';
import { format } from 'date-fns';
import { propertyApi } from '@/lib/api/property';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const TIME_RANGES = [
  { id: 'week', name: 'This Week' },
  { id: 'month', name: 'This Month' },
  { id: 'quarter', name: 'This Quarter' },
  { id: 'year', name: 'This Year' },
];

const REPORT_TYPES = [
  { id: 'service', name: 'Service Reports' },
  { id: 'pest', name: 'Pest Activity' },
  { id: 'revenue', name: 'Revenue Analysis' },
  { id: 'client', name: 'Client Analytics' },
];

export function ServiceReports() {
  const [timeRange, setTimeRange] = React.useState('month');
  const [reportType, setReportType] = React.useState('service');

  const { data: reportData, isLoading } = useQuery({
    queryKey: ['service-reports', timeRange, reportType],
    queryFn: () =>
      propertyApi.getServiceReports({ timeRange, reportType }),
  });

  const handleExport = async (format: 'pdf' | 'csv' | 'excel') => {
    try {
      const response = await propertyApi.exportReport({
        timeRange,
        reportType,
        format,
      });
      const mimeTypes = {
        pdf: 'application/pdf',
        csv: 'text/csv',
        excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };
      const blob = new Blob([response], { type: mimeTypes[format] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `service-report-${timeRange}-${reportType}-${new Date().toISOString()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  const renderServiceMetrics = () => (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        {reportData?.metrics.map((metric: any) => (
          <Card key={metric.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary/10">
                {metric.icon === 'calendar' && <Calendar className="h-4 w-4" />}
                {metric.icon === 'users' && <Users className="h-4 w-4" />}
                {metric.icon === 'activity' && <Activity className="h-4 w-4" />}
                {metric.icon === 'dollar' && <DollarSign className="h-4 w-4" />}
              </div>
              <div
                className={`text-sm ${
                  metric.change > 0
                    ? 'text-green-600'
                    : metric.change < 0
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {metric.change > 0 ? '+' : ''}
                {metric.change}%
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Service Trends</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={reportData?.trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Service Types</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportData?.serviceTypes}
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
                {reportData?.serviceTypes.map((entry: any, index: number) => (
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
          <h4 className="text-lg font-semibold mb-4">Revenue by Service</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData?.revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#0088FE" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Service Reports</h2>
          <p className="text-sm text-muted-foreground">
            Analyze service performance and trends
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => handleExport('pdf')}
            className="flex items-center space-x-1"
          >
            <FileText className="h-4 w-4" />
            <span>PDF</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('excel')}
            className="flex items-center space-x-1"
          >
            <FileText className="h-4 w-4" />
            <span>Excel</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('csv')}
            className="flex items-center space-x-1"
          >
            <FileText className="h-4 w-4" />
            <span>CSV</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="flex items-center space-x-1"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Time Range</label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGES.map((range) => (
                  <SelectItem key={range.id} value={range.id}>
                    {range.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_TYPES.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {isLoading ? (
        <div>Loading reports...</div>
      ) : (
        renderServiceMetrics()
      )}
    </div>
  );
}

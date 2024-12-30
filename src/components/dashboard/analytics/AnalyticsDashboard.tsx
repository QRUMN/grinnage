import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { usePermissions } from '@/hooks/usePermissions';
import { UserAnalytics, AnalyticsFilter, ReportConfig } from '@/types/analytics';
import { userApi } from '@/lib/api/users';
import { LineChart, BarChart, PieChart } from '@/components/charts';
import { toast } from 'sonner';

export function AnalyticsDashboard() {
  const { can } = usePermissions();
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AnalyticsFilter>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString(),
  });

  useEffect(() => {
    fetchAnalytics();
  }, [filter]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await userApi.getUserAnalytics(filter);
      setAnalytics(data);
    } catch (error) {
      toast.error('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: ReportConfig['format']) => {
    try {
      const config: ReportConfig = {
        type: 'system_usage',
        filters: filter,
        metrics: ['users', 'activity', 'security'],
        format,
      };

      const response = await userApi.generateReport(config);
      // Handle the report download
      window.location.href = response.downloadUrl;
    } catch (error) {
      toast.error('Failed to generate report');
    }
  };

  if (!can('analytics.view')) {
    return (
      <div className="p-4 text-center">
        You don't have permission to view analytics.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        {can('analytics.export') && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleExport('csv')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport('pdf')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        )}
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-4">
          <DateRangePicker
            value={{
              from: new Date(filter.startDate),
              to: new Date(filter.endDate),
            }}
            onChange={({ from, to }) => setFilter({
              ...filter,
              startDate: from.toISOString(),
              endDate: to.toISOString(),
            })}
          />
        </div>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            Loading analytics...
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
              <PieChart
                data={Object.entries(analytics?.usersByRole ?? {}).map(([role, count]) => ({
                  name: role,
                  value: count,
                }))}
              />
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Registration Trend</h3>
              <LineChart
                data={analytics?.registrationTrend ?? []}
                xKey="timestamp"
                yKey="value"
                label="New Users"
              />
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Login Activity</h3>
              <BarChart
                data={analytics?.loginActivity ?? []}
                xKey="timestamp"
                yKey="value"
                label="Logins"
              />
            </Card>

            <Card className="p-4 col-span-full">
              <h3 className="text-lg font-semibold mb-4">Security Overview</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {analytics?.failedLogins?.[0]?.value ?? 0}
                  </div>
                  <div className="text-sm text-gray-500">
                    Failed Login Attempts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {analytics?.activeUsers ?? 0}
                  </div>
                  <div className="text-sm text-gray-500">
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {analytics?.totalUsers ?? 0}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total Users
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}

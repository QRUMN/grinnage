import React from 'react';
import { AdminStats } from './overview/AdminStats';
import { RecentActivities } from './overview/RecentActivities';
import { SecurityAlerts } from './overview/SecurityAlerts';
import { SystemHealth } from './overview/SystemHealth';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePermissions } from '@/hooks/usePermissions';
import { Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function AdminOverview() {
  const { can } = usePermissions();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Implement refresh logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Dashboard refreshed');
    } catch (error) {
      toast.error('Failed to refresh dashboard');
    } finally {
      setRefreshing(false);
    }
  };

  const handleExport = async () => {
    try {
      // Implement export logic here
      toast.success('Export started');
    } catch (error) {
      toast.error('Failed to export dashboard data');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={cn(
              "mr-2 h-4 w-4",
              refreshing && "animate-spin"
            )} />
            Refresh
          </Button>
          {can('analytics.export') && (
            <Button
              variant="outline"
              onClick={handleExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AdminStats />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">System Health</h3>
            <Button variant="ghost" size="sm" onClick={handleRefresh}>
              <RefreshCw className={cn(
                "h-4 w-4",
                refreshing && "animate-spin"
              )} />
            </Button>
          </div>
          <SystemHealth />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Security Alerts</h3>
            {can('analytics.view') && (
              <Button variant="link" size="sm">
                View All
              </Button>
            )}
          </div>
          <SecurityAlerts />
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Activities</h3>
            {can('audit.view') && (
              <Button variant="link" size="sm">
                View All
              </Button>
            )}
          </div>
          <RecentActivities />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="grid gap-4 grid-cols-2">
            {can('users.create') && (
              <Button variant="outline" className="w-full">
                Add User
              </Button>
            )}
            {can('analytics.export') && (
              <Button variant="outline" className="w-full">
                Generate Report
              </Button>
            )}
            {can('settings.edit') && (
              <Button variant="outline" className="w-full">
                System Settings
              </Button>
            )}
            {can('audit.view') && (
              <Button variant="outline" className="w-full">
                View Audit Logs
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
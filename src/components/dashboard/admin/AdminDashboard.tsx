import React from 'react';
import { AdminOverview } from './AdminOverview';
import { UserManagement } from './UserManagement';
import { Analytics } from './Analytics';
import { AuditLogs } from './AuditLogs';
import { SystemSettings } from './SystemSettings';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { usePermissions } from '@/hooks/usePermissions';
import { AlertCircle, Settings, Users, Activity, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminDashboard() {
  const { can } = usePermissions();
  const [activeTab, setActiveTab] = React.useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Activity,
      component: AdminOverview,
      permission: 'analytics.view',
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      component: UserManagement,
      permission: 'users.view',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: Activity,
      component: Analytics,
      permission: 'analytics.view',
    },
    {
      id: 'audit',
      label: 'Audit Logs',
      icon: Shield,
      component: AuditLogs,
      permission: 'audit.view',
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      component: SystemSettings,
      permission: 'settings.view',
    },
  ];

  const availableTabs = tabs.filter(tab => can(tab.permission));

  if (availableTabs.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2 text-yellow-600">
          <AlertCircle className="h-5 w-5" />
          <p>You don't have permission to access any admin features.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <TabsList className="w-full border-b border-gray-200 dark:border-gray-700">
            {availableTabs.map(tab => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2',
                  'hover:text-primary transition-colors',
                  'border-b-2 border-transparent',
                  activeTab === tab.id && 'border-primary text-primary'
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {availableTabs.map(tab => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="mt-6 space-y-6"
          >
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
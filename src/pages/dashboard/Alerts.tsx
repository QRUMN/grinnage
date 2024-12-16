import React from 'react';
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function Alerts() {
  const alerts = [
    {
      id: 1,
      title: 'Weather Alert',
      message: 'Severe weather conditions may affect your scheduled service',
      severity: 'warning',
      date: '30 minutes ago',
    },
    {
      id: 2,
      title: 'Service Area Alert',
      message: 'Pest activity reported in your neighborhood',
      severity: 'info',
      date: '2 hours ago',
    },
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Shield className="h-5 w-5 text-info" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Alerts</h2>
          <p className="text-sm text-muted-foreground">
            Important updates and warnings
          </p>
        </div>
        <Button variant="outline" size="sm">
          Clear all
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="p-4">
              <div className="flex items-start space-x-4">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.date}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Dismiss
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

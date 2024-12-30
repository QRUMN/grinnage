import React from 'react';
import { Progress } from '@/components/ui/Progress';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  description: string;
}

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  lastChecked: string;
}

export function SystemHealth() {
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['system-metrics'],
    queryFn: async () => {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        metrics: [
          {
            name: 'CPU Usage',
            value: 45,
            status: 'healthy',
            description: 'Current CPU utilization',
          },
          {
            name: 'Memory Usage',
            value: 72,
            status: 'warning',
            description: 'Current memory utilization',
          },
          {
            name: 'Storage',
            value: 85,
            status: 'critical',
            description: 'Available storage space',
          },
          {
            name: 'Network',
            value: 28,
            status: 'healthy',
            description: 'Network bandwidth utilization',
          },
        ] as SystemMetric[],
      };
    },
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['service-status'],
    queryFn: async () => {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        services: [
          {
            name: 'API Server',
            status: 'operational',
            lastChecked: new Date().toISOString(),
          },
          {
            name: 'Database',
            status: 'operational',
            lastChecked: new Date().toISOString(),
          },
          {
            name: 'File Storage',
            status: 'degraded',
            lastChecked: new Date().toISOString(),
          },
          {
            name: 'Email Service',
            status: 'operational',
            lastChecked: new Date().toISOString(),
          },
        ] as ServiceStatus[],
      };
    },
  });

  const getStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getServiceStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getServiceStatusBadge = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <Badge variant="success">Operational</Badge>;
      case 'degraded':
        return <Badge variant="warning">Degraded</Badge>;
      case 'down':
        return <Badge variant="destructive">Down</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">System Metrics</h4>
        {metricsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {metrics?.metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{metric.name}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                  <span className="text-sm font-medium">{metric.value}%</span>
                </div>
                <div className="relative">
                  <Progress
                    value={metric.value}
                    className={getStatusColor(metric.status)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">Service Status</h4>
        {servicesLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {services?.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
              >
                <div className="flex items-center space-x-2">
                  {getServiceStatusIcon(service.status)}
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getServiceStatusBadge(service.status)}
                  <span className="text-xs text-muted-foreground">
                    {new Date(service.lastChecked).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
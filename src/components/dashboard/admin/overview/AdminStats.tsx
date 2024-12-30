import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/lib/api/users';
import {
  Users,
  UserCheck,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  loading?: boolean;
}

function StatCard({ title, value, icon: Icon, trend, loading }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <h3 className="text-2xl font-bold">{value}</h3>
            )}
          </div>
        </div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center text-sm",
            trend > 0 ? "text-green-600" : "text-red-600"
          )}>
            {trend > 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </Card>
  );
}

export function AdminStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await userApi.getUserAnalytics({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
      });
      return response;
    },
  });

  const cards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers ?? 0,
      icon: Users,
      trend: 12, // Example trend value
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers ?? 0,
      icon: UserCheck,
      trend: 5,
    },
    {
      title: 'Security Alerts',
      value: stats?.securityAlerts ?? 0,
      icon: AlertTriangle,
      trend: -8,
    },
    {
      title: 'System Health',
      value: '98%',
      icon: Activity,
      trend: 2,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <StatCard
          key={index}
          {...card}
          loading={isLoading}
        />
      ))}
    </div>
  );
}
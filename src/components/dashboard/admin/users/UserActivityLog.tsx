import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Login,
  LogOut,
  Settings,
  UserCog,
  Shield,
  Key,
  Mail,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { userApi } from '@/lib/api/users';

interface UserActivityLogProps {
  userId: string;
}

interface ActivityLog {
  id: string;
  type: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

const activityIcons: Record<string, React.ReactNode> = {
  LOGIN: <Login className="h-4 w-4" />,
  LOGOUT: <LogOut className="h-4 w-4" />,
  SETTINGS_UPDATED: <Settings className="h-4 w-4" />,
  PROFILE_UPDATED: <UserCog className="h-4 w-4" />,
  ROLE_UPDATED: <Shield className="h-4 w-4" />,
  PASSWORD_RESET: <Key className="h-4 w-4" />,
  EMAIL_UPDATED: <Mail className="h-4 w-4" />,
  SECURITY_ALERT: <AlertTriangle className="h-4 w-4" />,
};

export function UserActivityLog({ userId }: UserActivityLogProps) {
  const [page, setPage] = React.useState(1);
  const ITEMS_PER_PAGE = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['user-activity', userId, page],
    queryFn: () =>
      userApi.getUserActivity(userId, {
        page,
        limit: ITEMS_PER_PAGE,
      }),
  });

  const handleExport = async () => {
    try {
      const response = await userApi.exportUserActivity(userId);
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-activity-${userId}-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export activity log:', error);
    }
  };

  const getActivityBadge = (type: string) => {
    const variants: Record<string, string> = {
      LOGIN: 'success',
      LOGOUT: 'secondary',
      SETTINGS_UPDATED: 'warning',
      PROFILE_UPDATED: 'info',
      ROLE_UPDATED: 'warning',
      PASSWORD_RESET: 'destructive',
      EMAIL_UPDATED: 'warning',
      SECURITY_ALERT: 'destructive',
    };

    return (
      <Badge variant={variants[type] || 'default'} className="flex items-center gap-1">
        {activityIcons[type]}
        <span>{type.replace('_', ' ')}</span>
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  return (
    <Card>
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="font-semibold">Activity Log</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="flex items-center space-x-1"
        >
          <Download className="h-4 w-4" />
          <span>Export Log</span>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Activity</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Date & Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.activities.map((activity: ActivityLog) => (
            <TableRow key={activity.id}>
              <TableCell>{getActivityBadge(activity.type)}</TableCell>
              <TableCell>{activity.description}</TableCell>
              <TableCell>
                <span className="font-mono text-sm">{activity.ipAddress}</span>
              </TableCell>
              <TableCell>
                {format(new Date(activity.timestamp), 'PPp')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data?.totalPages > 1 && (
        <div className="p-4 flex items-center justify-between border-t">
          <div className="text-sm text-muted-foreground">
            Page {page} of {data.totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === data.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { toast } from 'sonner';
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Globe,
  AlertTriangle,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { format } from 'date-fns';
import { userApi } from '@/lib/api/users';

interface UserSecuritySettingsProps {
  userId: string;
}

interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  current: boolean;
}

export function UserSecuritySettings({ userId }: UserSecuritySettingsProps) {
  const queryClient = useQueryClient();

  const { data: security, isLoading } = useQuery({
    queryKey: ['user-security', userId],
    queryFn: () => userApi.getUserSecurity(userId),
  });

  const updateSecurityMutation = useMutation({
    mutationFn: (data: any) => userApi.updateUserSecurity(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-security', userId]);
      toast.success('Security settings updated');
    },
    onError: () => {
      toast.error('Failed to update security settings');
    },
  });

  const revokeSessionMutation = useMutation({
    mutationFn: (sessionId: string) => userApi.revokeSession(userId, sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-security', userId]);
      toast.success('Session revoked successfully');
    },
    onError: () => {
      toast.error('Failed to revoke session');
    },
  });

  const regenerateBackupCodesMutation = useMutation({
    mutationFn: () => userApi.regenerateBackupCodes(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-security', userId]);
      toast.success('Backup codes regenerated');
    },
    onError: () => {
      toast.error('Failed to regenerate backup codes');
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Authenticator App</p>
                <p className="text-sm text-muted-foreground">
                  Use an authenticator app to get two-factor authentication codes
                </p>
              </div>
            </div>
            <Switch
              checked={security?.twoFactorEnabled}
              onCheckedChange={(checked) =>
                updateSecurityMutation.mutate({ twoFactorEnabled: checked })
              }
            />
          </div>

          {security?.twoFactorEnabled && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Backup Codes</p>
                    <p className="text-sm text-muted-foreground">
                      {security.backupCodesRemaining} of 10 remaining
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => regenerateBackupCodesMutation.mutate()}
                  className="flex items-center space-x-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Regenerate</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Active Sessions</h3>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Updated {format(new Date(), 'PP p')}</span>
          </Badge>
        </div>
        <div className="space-y-4">
          {security?.sessions.map((session: SecuritySession) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{session.device}</p>
                    {session.current && (
                      <Badge variant="secondary">Current Session</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session.browser} • {session.location} • {session.ipAddress}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last active: {format(new Date(session.lastActive), 'PP p')}
                  </div>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => revokeSessionMutation.mutate(session.id)}
                  className="flex items-center space-x-1"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Revoke</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Security Log</h3>
        <div className="space-y-4">
          {security?.securityEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{event.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(event.timestamp), 'PP p')}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

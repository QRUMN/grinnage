import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { toast } from 'sonner';
import {
  UserCog,
  Shield,
  History,
  Key,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Clock,
  AlertTriangle,
  Ban,
  Lock,
  Unlock,
  RefreshCw,
} from 'lucide-react';
import { userApi } from '@/lib/api/users';
import { Dialog } from '@/components/ui/Dialog';
import { UserActivityLog } from './UserActivityLog';
import { UserSecuritySettings } from './UserSecuritySettings';
import { UserForm } from './UserForm';

export function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = React.useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = React.useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId!),
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => userApi.updateUser(userId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userId]);
      toast.success('User updated successfully');
      setIsEditing(false);
    },
    onError: () => {
      toast.error('Failed to update user');
    },
  });

  const suspendMutation = useMutation({
    mutationFn: () => userApi.updateUser(userId!, { status: 'SUSPENDED' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userId]);
      toast.success('User suspended');
    },
    onError: () => {
      toast.error('Failed to suspend user');
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: () => userApi.resetUserPassword(userId!),
    onSuccess: () => {
      toast.success('Password reset email sent');
    },
    onError: () => {
      toast.error('Failed to send password reset email');
    },
  });

  const toggleTwoFactorMutation = useMutation({
    mutationFn: () =>
      userApi.updateUser(userId!, {
        twoFactorEnabled: !user?.twoFactorEnabled,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userId]);
      toast.success(
        user?.twoFactorEnabled
          ? '2FA disabled successfully'
          : '2FA enabled successfully'
      );
    },
    onError: () => {
      toast.error('Failed to update 2FA status');
    },
  });

  if (isLoading || !user) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: string; icon: React.ReactNode }> = {
      ACTIVE: { variant: 'success', icon: <Shield className="h-3 w-3" /> },
      INACTIVE: { variant: 'secondary', icon: null },
      SUSPENDED: { variant: 'destructive', icon: <Ban className="h-3 w-3" /> },
      PENDING: { variant: 'warning', icon: <AlertTriangle className="h-3 w-3" /> },
    };

    const { variant, icon } = variants[status] || variants.INACTIVE;

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {icon}
        {status.toLowerCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar
            src={user.avatar}
            fallback={user.fullName.charAt(0)}
            className="h-16 w-16"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.fullName}</h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-1"
          >
            <UserCog className="h-4 w-4" />
            <span>Edit Profile</span>
          </Button>
          <Button
            variant="destructive"
            onClick={() => suspendMutation.mutate()}
            className="flex items-center space-x-1"
          >
            <Ban className="h-4 w-4" />
            <span>Suspend User</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">User Information</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Status</span>
              </div>
              {getStatusBadge(user.status)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Member Since</span>
              </div>
              <span className="text-sm">
                {format(new Date(user.createdAt), 'PPP')}
              </span>
            </div>
            {user.phone && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Phone</span>
                </div>
                <span className="text-sm">{user.phone}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Location</span>
                </div>
                <span className="text-sm">{user.location}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Last Active</span>
              </div>
              <span className="text-sm">
                {user.lastActivityAt
                  ? format(new Date(user.lastActivityAt), 'PPp')
                  : 'Never'}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Two-Factor Authentication</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleTwoFactorMutation.mutate()}
                className="flex items-center space-x-1"
              >
                {user.twoFactorEnabled ? (
                  <>
                    <Unlock className="h-4 w-4" />
                    <span>Disable</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Enable</span>
                  </>
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Password</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resetPasswordMutation.mutate()}
                className="flex items-center space-x-1"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reset</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity" className="flex items-center space-x-1">
            <History className="h-4 w-4" />
            <span>Activity Log</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-1">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="activity">
          <UserActivityLog userId={userId!} />
        </TabsContent>
        <TabsContent value="security">
          <UserSecuritySettings userId={userId!} />
        </TabsContent>
      </Tabs>

      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit User"
      >
        <UserForm
          userId={userId}
          initialData={user}
          onSubmit={async (data) => {
            await updateMutation.mutateAsync(data);
          }}
        />
      </Dialog>

      <Dialog
        open={showSecurityDialog}
        onClose={() => setShowSecurityDialog(false)}
        title="Security Settings"
      >
        <UserSecuritySettings userId={userId!} />
      </Dialog>
    </div>
  );
}

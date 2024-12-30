import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { usePermissions } from '@/hooks/usePermissions';
import { User } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';
import {
  MoreHorizontal,
  Shield,
  UserCog,
  Mail,
  Key,
  Ban,
  Trash,
  Eye,
  History,
  AlertTriangle,
} from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import { toast } from 'sonner';
import { userApi } from '@/lib/api/users';

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
  selectedUsers: string[];
  onSelectUsers: (userIds: string[]) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
  selectedUsers,
  onSelectUsers,
  page,
  totalPages,
  onPageChange,
}: UserTableProps) {
  const { can } = usePermissions();
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    action: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    description: '',
    action: async () => {},
  });

  const handleSelectAll = (checked: boolean) => {
    onSelectUsers(checked ? users.map(user => user.id) : []);
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    onSelectUsers(
      checked
        ? [...selectedUsers, userId]
        : selectedUsers.filter(id => id !== userId)
    );
  };

  const handleResetPassword = async (userId: string) => {
    setActionDialog({
      isOpen: true,
      title: 'Reset Password',
      description: 'Are you sure you want to reset this user\'s password? They will receive an email with instructions.',
      action: async () => {
        try {
          await userApi.resetUserPassword(userId);
          toast.success('Password reset email sent');
        } catch (error) {
          toast.error('Failed to reset password');
        }
      },
    });
  };

  const handleSuspend = async (userId: string) => {
    setActionDialog({
      isOpen: true,
      title: 'Suspend User',
      description: 'Are you sure you want to suspend this user? They will be unable to access the system.',
      action: async () => {
        try {
          await userApi.updateUser(userId, { status: 'SUSPENDED' });
          toast.success('User suspended');
        } catch (error) {
          toast.error('Failed to suspend user');
        }
      },
    });
  };

  const handleImpersonate = async (userId: string) => {
    setActionDialog({
      isOpen: true,
      title: 'Impersonate User',
      description: 'Are you sure you want to impersonate this user? You will be logged in as them.',
      action: async () => {
        try {
          await userApi.startImpersonation(userId);
          toast.success('Impersonation started');
        } catch (error) {
          toast.error('Failed to start impersonation');
        }
      },
    });
  };

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
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>2FA</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => handleSelectUser(user.id, checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.avatar}
                        fallback={user.fullName.charAt(0)}
                      />
                      <div>
                        <div className="font-medium">{user.fullName}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    {user.lastActivityAt
                      ? formatDistanceToNow(new Date(user.lastActivityAt), { addSuffix: true })
                      : 'Never'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.twoFactorEnabled ? 'success' : 'secondary'}
                    >
                      {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        {can('users.edit') && (
                          <>
                            <DropdownMenuItem onClick={() => onEdit(user.id)}>
                              <UserCog className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                          </>
                        )}
                        {can('users.view') && (
                          <>
                            <DropdownMenuItem onClick={() => window.location.href = `/admin/users/${user.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `/admin/users/${user.id}/activity`}>
                              <History className="mr-2 h-4 w-4" />
                              View Activity
                            </DropdownMenuItem>
                          </>
                        )}
                        {can('users.impersonate') && (
                          <DropdownMenuItem onClick={() => handleImpersonate(user.id)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Impersonate
                          </DropdownMenuItem>
                        )}
                        {can('users.edit') && (
                          <>
                            <DropdownMenuItem onClick={() => handleSuspend(user.id)}>
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDelete(user.id)}
                              className="text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedUsers.length > 0 && (
            <span>{selectedUsers.length} users selected</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {page} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog
        open={actionDialog.isOpen}
        onClose={() => setActionDialog({ ...actionDialog, isOpen: false })}
        title={actionDialog.title}
        description={actionDialog.description}
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={async () => {
          await actionDialog.action();
          setActionDialog({ ...actionDialog, isOpen: false });
        }}
      />
    </div>
  );
}
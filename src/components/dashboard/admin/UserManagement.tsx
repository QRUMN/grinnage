import React, { useState } from 'react';
import { UserTable } from './users/UserTable';
import { UserFilters } from './users/UserFilters';
import { Button } from '@/components/ui/Button';
import { Plus, Upload, Download } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api/users';
import { toast } from 'sonner';
import { Dialog } from '@/components/ui/Dialog';
import { UserForm } from './users/UserForm';
import { FileUpload } from './users/FileUpload';

const ITEMS_PER_PAGE = 10;

export function UserManagement() {
  const queryClient = useQueryClient();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    role: 'All',
    status: 'All',
    dateRange: {
      from: null,
      to: null,
    },
    loginStatus: 'All',
    activityLevel: 'All',
  });
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['users', page, filters],
    queryFn: () =>
      userApi.getUsers({
        page,
        limit: ITEMS_PER_PAGE,
        ...filters,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => userApi.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  const exportMutation = useMutation({
    mutationFn: () => userApi.exportUsers(filters),
    onSuccess: (data) => {
      // Create and download CSV file
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users-export-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Users exported successfully');
    },
    onError: () => {
      toast.error('Failed to export users');
    },
  });

  const handleImport = async (file: File) => {
    try {
      await userApi.importUsers(file);
      queryClient.invalidateQueries(['users']);
      setShowImportDialog(false);
      toast.success('Users imported successfully');
    } catch (error) {
      toast.error('Failed to import users');
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteMutation.mutateAsync(userId);
    }
  };

  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedUsers.length} users?`
      )
    ) {
      try {
        await Promise.all(
          selectedUsers.map((userId) => userApi.deleteUser(userId))
        );
        queryClient.invalidateQueries(['users']);
        setSelectedUsers([]);
        toast.success('Users deleted successfully');
      } catch (error) {
        toast.error('Failed to delete users');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setEditingUser('new')}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
          {selectedUsers.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              className="flex items-center space-x-1"
            >
              Delete Selected ({selectedUsers.length})
            </Button>
          )}
        </div>
      </div>

      <UserFilters
        filters={filters}
        onFilterChange={setFilters}
        onExport={() => exportMutation.mutate()}
        onImport={() => setShowImportDialog(true)}
        onRefresh={() => queryClient.invalidateQueries(['users'])}
      />

      <UserTable
        users={data?.users || []}
        loading={isLoading}
        onEdit={setEditingUser}
        onDelete={handleDelete}
        selectedUsers={selectedUsers}
        onSelectUsers={setSelectedUsers}
        page={page}
        totalPages={Math.ceil((data?.total || 0) / ITEMS_PER_PAGE)}
        onPageChange={setPage}
      />

      <Dialog
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        title={editingUser === 'new' ? 'Add User' : 'Edit User'}
      >
        <UserForm
          userId={editingUser === 'new' ? null : editingUser}
          onSubmit={async (data) => {
            try {
              if (editingUser === 'new') {
                await userApi.createUser(data);
                toast.success('User created successfully');
              } else {
                await userApi.updateUser(editingUser, data);
                toast.success('User updated successfully');
              }
              queryClient.invalidateQueries(['users']);
              setEditingUser(null);
            } catch (error) {
              toast.error(
                editingUser === 'new'
                  ? 'Failed to create user'
                  : 'Failed to update user'
              );
            }
          }}
        />
      </Dialog>

      <Dialog
        open={showImportDialog}
        onClose={() => setShowImportDialog(false)}
        title="Import Users"
      >
        <FileUpload
          accept=".csv"
          onUpload={handleImport}
          description="Upload a CSV file containing user data. The file should include headers for email, fullName, role, and status."
        />
      </Dialog>
    </div>
  );
}
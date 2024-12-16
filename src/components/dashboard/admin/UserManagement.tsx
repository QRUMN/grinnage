import React, { useState } from 'react';
import { UserFilters } from './users/UserFilters';
import { UserStats } from './users/UserStats';
import { UserTable } from './users/UserTable';
import { Button } from '../../ui/Button';
import { Plus } from 'lucide-react';
import { AddUserDialog } from './users/AddUserDialog';
import { DashboardCard } from '../common/DashboardCard';

export const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user:', userId);
  };

  const handleUserAdded = () => {
    // Refresh user list or update state
    console.log('User added, refreshing list...');
  };

  // Mock users data
  const users = [
    {
      id: '1',
      fullName: 'John Residential',
      email: 'john@example.com',
      role: 'residential',
      lastLogin: '2024-03-01 10:30:00'
    },
    {
      id: '2',
      fullName: 'Jane Commercial',
      email: 'jane@example.com',
      role: 'commercial',
      lastLogin: '2024-03-02 15:45:00'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <UserStats />

      <DashboardCard>
        <div className="space-y-6">
          <UserFilters
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilters}
          />
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </DashboardCard>

      <AddUserDialog
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
};
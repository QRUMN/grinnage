import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { UserStats } from './users/UserStats';
import { UserFilters } from './users/UserFilters';
import { UserTable } from './users/UserTable';
import { DashboardCard } from '../common/DashboardCard';

export const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  
  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user:', userId);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage system users and permissions</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <UserPlus className="h-5 w-5" />
          <span>Add User</span>
        </button>
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
    </div>
  );
};
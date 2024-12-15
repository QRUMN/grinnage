import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../common/DashboardLayout';
import { AdminOverview } from './AdminOverview';
import { UserManagement } from './UserManagement';
import { Analytics } from './Analytics';
import { AuditLogs } from './AuditLogs';
import { SystemSettings } from './SystemSettings';

export const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="settings" element={<SystemSettings />} />
      </Routes>
    </DashboardLayout>
  );
};
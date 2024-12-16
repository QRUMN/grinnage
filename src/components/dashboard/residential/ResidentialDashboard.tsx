import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DashboardLayout } from '../common/DashboardLayout';
import { TabNav } from '../common/TabNav';
import { Overview } from '../../../pages/dashboard/Overview';
import { Appointments } from '../../../pages/dashboard/Appointments';
import { Billing } from '../../../pages/dashboard/Billing';
import { Documents } from '../../../pages/dashboard/Documents';
import { Settings } from '../../../pages/dashboard/Settings';
import { MediaUpload } from '../../../pages/dashboard/MediaUpload';
import {
  Home,
  Calendar,
  CreditCard,
  FileText,
  Settings as SettingsIcon,
  Image,
} from 'lucide-react';

export const ResidentialDashboard = () => {
  const location = useLocation();
  const basePath = '/dashboard';

  const tabs = [
    {
      label: 'Overview',
      path: basePath,
      icon: <Home className="h-4 w-4" />,
    },
    {
      label: 'Appointments',
      path: `${basePath}/appointments`,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: 'Billing',
      path: `${basePath}/billing`,
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      label: 'Documents',
      path: `${basePath}/documents`,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: 'Media',
      path: `${basePath}/media`,
      icon: <Image className="h-4 w-4" />,
    },
    {
      label: 'Settings',
      path: `${basePath}/settings`,
      icon: <SettingsIcon className="h-4 w-4" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Manage your residential pest control services
            </p>
          </div>
          <TabNav 
            tabs={tabs} 
            variant="pills"
            className="ml-auto" 
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="billing" element={<Billing />} />
            <Route path="documents" element={<Documents />} />
            <Route path="media" element={<MediaUpload />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </DashboardLayout>
  );
};
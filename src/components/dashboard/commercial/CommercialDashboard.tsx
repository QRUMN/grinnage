import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DashboardLayout } from '../common/DashboardLayout';
import { TabNav } from '../common/TabNav';
import { Overview } from './Overview';
import { CommercialAppointments } from './CommercialAppointments';
import { CommercialBilling } from './CommercialBilling';
import { CommercialDocuments } from './CommercialDocuments';
import { CommercialLocations } from './CommercialLocations';
import { CommercialSettings } from './CommercialSettings';
import {
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Settings as SettingsIcon,
  MapPin,
  ClipboardList,
  Users,
} from 'lucide-react';

export const CommercialDashboard = () => {
  const location = useLocation();
  const basePath = '/commercial';

  const tabs = [
    {
      label: 'Overview',
      path: basePath,
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      label: 'Locations',
      path: `${basePath}/locations`,
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      label: 'Appointments',
      path: `${basePath}/appointments`,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: 'Contracts',
      path: `${basePath}/contracts`,
      icon: <ClipboardList className="h-4 w-4" />,
    },
    {
      label: 'Staff',
      path: `${basePath}/staff`,
      icon: <Users className="h-4 w-4" />,
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
            <h1 className="text-2xl font-semibold tracking-tight">Commercial Dashboard</h1>
            <p className="text-sm text-gray-500">
              Manage your commercial pest control services across multiple locations
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
            <Route path="locations" element={<CommercialLocations />} />
            <Route path="appointments" element={<CommercialAppointments />} />
            <Route path="contracts/*" element={<ContractsRoutes />} />
            <Route path="staff/*" element={<StaffRoutes />} />
            <Route path="billing" element={<CommercialBilling />} />
            <Route path="documents" element={<CommercialDocuments />} />
            <Route path="settings" element={<CommercialSettings />} />
          </Routes>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ContractsRoutes = () => (
  <Routes>
    <Route index element={<ContractsList />} />
    <Route path="new" element={<ContractForm />} />
    <Route path=":id" element={<ContractDetails />} />
    <Route path=":id/edit" element={<ContractForm />} />
  </Routes>
);

const StaffRoutes = () => (
  <Routes>
    <Route index element={<StaffList />} />
    <Route path="new" element={<StaffForm />} />
    <Route path=":id" element={<StaffDetails />} />
    <Route path=":id/edit" element={<StaffForm />} />
  </Routes>
);
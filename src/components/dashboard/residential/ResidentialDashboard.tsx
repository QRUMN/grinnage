import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../common/DashboardLayout';
import { Overview } from '../../../pages/dashboard/Overview';
import { Appointments } from '../../../pages/dashboard/Appointments';
import { Billing } from '../../../pages/dashboard/Billing';
import { Documents } from '../../../pages/dashboard/Documents';
import { Settings } from '../../../pages/dashboard/Settings';
import { MediaUpload } from '../../../pages/dashboard/MediaUpload';

export const ResidentialDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="billing" element={<Billing />} />
        <Route path="documents" element={<Documents />} />
        <Route path="media" element={<MediaUpload />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../common/DashboardLayout';
import { CommercialOverview } from './CommercialOverview';
import { CommercialAppointments } from './CommercialAppointments';
import { CommercialBilling } from './CommercialBilling';
import { CommercialDocuments } from './CommercialDocuments';
import { CommercialSettings } from './CommercialSettings';
import { CommercialLocations } from './CommercialLocations';
import { MediaUpload } from '../../../pages/dashboard/MediaUpload';

export const CommercialDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<CommercialOverview />} />
        <Route path="appointments" element={<CommercialAppointments />} />
        <Route path="billing" element={<CommercialBilling />} />
        <Route path="documents" element={<CommercialDocuments />} />
        <Route path="locations" element={<CommercialLocations />} />
        <Route path="media" element={<MediaUpload />} />
        <Route path="settings" element={<CommercialSettings />} />
      </Routes>
    </DashboardLayout>
  );
};
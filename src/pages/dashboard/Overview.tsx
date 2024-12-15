import React from 'react';
import { OverviewHeader } from '../../components/dashboard/overview/OverviewHeader';
import { QuickStats } from '../../components/dashboard/overview/QuickStats';
import { RecentActivity } from '../../components/dashboard/overview/RecentActivity';
import { RegistrationAlert } from '../../components/dashboard/overview/RegistrationAlert';

export const Overview = () => {
  return (
    <div className="space-y-6">
      <OverviewHeader />
      <RegistrationAlert />
      <QuickStats />
      <RecentActivity />
    </div>
  );
};
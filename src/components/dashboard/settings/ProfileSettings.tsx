import React from 'react';
import { useAtomValue } from 'jotai';
import { authStateAtom } from '../../../store/auth';
import { DashboardCard } from '../common/DashboardCard';
import { FormInput } from '../../common/form/FormInput';

export const ProfileSettings = () => {
  const { user } = useAtomValue(authStateAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
  };

  return (
    <DashboardCard title="Profile Information">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Full Name"
            defaultValue={user?.fullName}
            placeholder="Your full name"
          />
          <FormInput
            label="Email Address"
            type="email"
            defaultValue={user?.email}
            placeholder="you@example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
          />
          <FormInput
            label="Address"
            placeholder="123 Main St"
          />
        </div>

        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </DashboardCard>
  );
};
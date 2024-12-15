import React from 'react';
import { useAtomValue } from 'jotai';
import { authStateAtom } from '../../../store/auth';

export const OverviewHeader = () => {
  const { user } = useAtomValue(authStateAtom);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getGreeting()}, {user?.fullName}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Account Type: <span className="capitalize">{user?.clientType}</span>
        </p>
      </div>
      <span className="px-4 py-2 bg-[#56e39f]/10 text-[#56e39f] rounded-full text-sm font-medium">
        Active Account
      </span>
    </div>
  );
};
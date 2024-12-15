import React from 'react';
import { Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { authStateAtom } from '../../store/auth';

export const Overview = () => {
  const location = useLocation();
  const { user } = useAtomValue(authStateAtom);
  const registrationData = location.state?.registrationData;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8">
      {/* Header with Greeting */}
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

      {/* New Registration Alert */}
      {registrationData && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <p className="text-green-700 dark:text-green-300">
              Your inspection request has been received! We'll contact you shortly to confirm your appointment.
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Next Service</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">March 15, 2024</p>
            </div>
            <Calendar className="w-8 h-8 text-[#56e39f]" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Active Issues</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">2 Reports</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Treatment Status</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Up to Date</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { date: 'Feb 28', action: 'Monthly inspection completed', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
            { date: 'Feb 15', action: 'Invoice paid', icon: <CheckCircle className="w-5 h-5 text-[#56e39f]" /> },
            { date: 'Feb 1', action: 'Treatment plan updated', icon: <Clock className="w-5 h-5 text-blue-500" /> },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b dark:border-dark-700 last:border-0">
              <div className="flex items-center space-x-3">
                {activity.icon}
                <span className="text-gray-900 dark:text-white">{activity.action}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">{activity.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
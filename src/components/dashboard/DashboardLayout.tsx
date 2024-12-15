import React from 'react';
import { Home, Calendar, CreditCard, FileText, Settings, Menu, User } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../lib/api/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Overview', href: '/dashboard' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Appointments', href: '/dashboard/appointments' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Billing', href: '/dashboard/billing' },
    { icon: <FileText className="w-5 h-5" />, label: 'Documents', href: '/dashboard/documents' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-900">
      <Sidebar navItems={navItems} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center p-4 border-b">
          <button className="md:hidden mr-4">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1" />
          <button className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <span className="hidden md:inline">Profile</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
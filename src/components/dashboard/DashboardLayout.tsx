import React from 'react';
import { Home, Calendar, CreditCard, FileText, Settings, LogOut } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
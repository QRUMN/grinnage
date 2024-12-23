import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { authStateAtom } from '../../store/auth';
import {
  LayoutGrid,
  Calendar,
  FileText,
  CreditCard,
  Settings,
  Bell,
  AlertTriangle,
  Building2,
  ClipboardList,
  BarChart3,
  Users,
  Activity,
  Wallet,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const getNavItems = (role: string) => {
  switch (role) {
    case 'residential':
      return [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
        { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
        { name: 'Documents', href: '/dashboard/documents', icon: FileText },
        { name: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
        { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
        { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
        { name: 'Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
      ];
    case 'commercial':
      return [
        { name: 'Dashboard', href: '/commercial', icon: LayoutGrid },
        { name: 'Properties', href: '/commercial/properties', icon: Building2 },
        { name: 'Contracts', href: '/commercial/contracts', icon: ClipboardList },
        { name: 'Wallet', href: '/commercial/wallet', icon: Wallet },
        { name: 'Billing', href: '/commercial/billing', icon: CreditCard },
        { name: 'Reports', href: '/commercial/reports', icon: BarChart3 },
        { name: 'Settings', href: '/commercial/settings', icon: Settings },
      ];
    case 'admin':
      return [
        { name: 'Dashboard', href: '/admin', icon: LayoutGrid },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Properties', href: '/admin/properties', icon: Building2 },
        { name: 'Wallet', href: '/admin/wallet', icon: Wallet },
        { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
        { name: 'Activity', href: '/admin/activity', icon: Activity },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ];
    default:
      return [];
  }
};

export const DashboardLayout = () => {
  const { pathname } = useLocation();
  const { user } = useAtomValue(authStateAtom);
  const navItems = getNavItems(user?.role || '');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold">
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Dashboard
          </h1>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center px-4 py-2 text-sm rounded-md transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <header className="h-16 border-b bg-white flex items-center px-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome back,</span>
            <span className="font-medium">{user?.name}</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

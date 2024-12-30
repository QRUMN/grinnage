import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
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
  LogOut,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeToggle } from '../ui/ThemeToggle';
import { authApi } from '../../lib/api/auth';

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
  const navigate = useNavigate();
  const { user } = useAtomValue(authStateAtom);
  const navItems = getNavItems(user?.role || '');

  const handleLogout = async () => {
    try {
      await authApi.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold">
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Dashboard
            </h1>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  pathname === item.href
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-2">{user?.role}</p>
                </div>
                <ThemeToggle />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <header className="h-16 border-b bg-white dark:bg-gray-800 flex items-center px-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Welcome back,</span>
              <span className="font-medium">{user?.name}</span>
            </div>
          </header>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

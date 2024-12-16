import React from 'react';
import { Outlet } from 'react-router-dom';
import { Home, Users, Settings, Activity, FileText, LogOut } from 'lucide-react';
import { Sidebar } from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../lib/api/auth';
import { ThemeToggle } from '../../layout/ThemeToggle';
import { useAtomValue } from 'jotai';
import { authStateAtom } from '../../../store/auth';
import { cn } from '../../../lib/utils';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
}

export const DashboardLayout = ({ children, sidebar, header }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { user } = useAtomValue(authStateAtom);

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/login');
  };

  const getNavItems = () => {
    if (user?.role === 'admin') {
      return [
        { icon: <Home className="w-5 h-5" />, label: 'Overview', href: '/admin' },
        { icon: <Users className="w-5 h-5" />, label: 'Users', href: '/admin/users' },
        { icon: <Activity className="w-5 h-5" />, label: 'Analytics', href: '/admin/analytics' },
        { icon: <FileText className="w-5 h-5" />, label: 'Audit Logs', href: '/admin/audit-logs' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/admin/settings' }
      ];
    }
    return [];
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-900">
      {sidebar ? (
        <aside className="w-64 border-r bg-white dark:bg-dark-800">
          {sidebar}
        </aside>
      ) : (
        <Sidebar navItems={getNavItems()} onLogout={handleLogout} />
      )}
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0">
          {header}
          <div className="px-8 py-4 border-b bg-white dark:bg-dark-800">
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children || <Outlet />}
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Home, Users, Settings, Activity, FileText, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export const DashboardLayout = ({
  children,
  sidebar,
  header,
  sidebarCollapsed = false,
  onSidebarToggle
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { user } = useAtomValue(authStateAtom);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
    <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-gray-50 dark:bg-dark-900">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="h-full overflow-y-auto pt-16 pb-4">
              {sidebar ? (
                sidebar
              ) : (
                <Sidebar navItems={getNavItems()} onLogout={handleLogout} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "hidden md:block transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        {sidebar ? (
          sidebar
        ) : (
          <Sidebar navItems={getNavItems()} onLogout={handleLogout} />
        )}
      </div>

      {/* Main Content */}
      <main className={cn(
        "flex-1 overflow-y-auto p-4 md:p-6",
        "transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "blur-sm" : ""
      )}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex-shrink-0">
            {header}
            <div className="px-8 py-4 border-b bg-white dark:bg-dark-800">
              <div className="flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          </div>
          {children || <Outlet />}
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleMobileMenu}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
    </div>
  );
};
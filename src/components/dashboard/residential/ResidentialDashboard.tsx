import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../common/DashboardLayout';
import { SideNav } from '../common/SideNav';
import { Overview } from '../../../pages/dashboard/Overview';
import { Appointments } from '../../../pages/dashboard/Appointments';
import { Billing } from '../../../pages/dashboard/Billing';
import { Documents } from '../../../pages/dashboard/Documents';
import { Settings } from '../../../pages/dashboard/Settings';
import { MediaUpload } from '../../../pages/dashboard/MediaUpload';
import {
  Home,
  Calendar,
  CreditCard,
  FileText,
  Settings as SettingsIcon,
  Image,
  Bell,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  AlertTriangle,
  Clock,
  UserCircle,
} from 'lucide-react';
import cn from 'classnames';

export const ResidentialDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const basePath = '/dashboard';

  const navItems = [
    {
      label: 'Overview',
      path: basePath,
      icon: <Home className="h-5 w-5" />,
      badge: {
        count: 2,
        variant: 'warning' as const
      }
    },
    {
      label: 'Appointments',
      path: `${basePath}/appointments`,
      icon: <Calendar className="h-5 w-5" />,
      subItems: [
        {
          label: 'Upcoming',
          path: `${basePath}/appointments/upcoming`
        },
        {
          label: 'Past',
          path: `${basePath}/appointments/past`
        },
        {
          label: 'Reschedule',
          path: `${basePath}/appointments/reschedule`
        }
      ]
    },
    {
      label: 'Billing',
      path: `${basePath}/billing`,
      icon: <CreditCard className="h-5 w-5" />,
      badge: {
        count: 1,
        variant: 'error' as const
      },
      subItems: [
        {
          label: 'Invoices',
          path: `${basePath}/billing/invoices`
        },
        {
          label: 'Payment Methods',
          path: `${basePath}/billing/payment-methods`
        },
        {
          label: 'History',
          path: `${basePath}/billing/history`
        }
      ]
    },
    {
      label: 'Documents',
      path: `${basePath}/documents`,
      icon: <FileText className="h-5 w-5" />,
      subItems: [
        {
          label: 'Contracts',
          path: `${basePath}/documents/contracts`
        },
        {
          label: 'Reports',
          path: `${basePath}/documents/reports`
        },
        {
          label: 'Forms',
          path: `${basePath}/documents/forms`
        }
      ]
    },
    {
      label: 'Media',
      path: `${basePath}/media`,
      icon: <Image className="h-5 w-5" />,
    },
    {
      label: 'Messages',
      path: `${basePath}/messages`,
      icon: <MessageSquare className="h-5 w-5" />,
      badge: {
        count: 3,
        variant: 'success' as const
      }
    },
    {
      label: 'Settings',
      path: `${basePath}/settings`,
      icon: <SettingsIcon className="h-5 w-5" />,
      subItems: [
        {
          label: 'Profile',
          path: `${basePath}/settings/profile`
        },
        {
          label: 'Notifications',
          path: `${basePath}/settings/notifications`
        },
        {
          label: 'Security',
          path: `${basePath}/settings/security`
        }
      ]
    }
  ];

  const header = (
    <div className="px-8 py-6 bg-white border-b">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage your residential pest control services
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <HelpCircle className="h-6 w-6" />
          </button>
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <AlertTriangle className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-yellow-500 text-white rounded-full">
              2
            </span>
          </button>
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
              3
            </span>
          </button>
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className={cn("p-6", sidebarCollapsed ? "px-4" : "")}>
        <h2 className={cn(
          "font-semibold transition-all",
          sidebarCollapsed ? "text-center text-sm" : "text-lg"
        )}>
          {sidebarCollapsed ? "RP" : "Residential Portal"}
        </h2>
      </div>
      <div className="px-3 flex-1">
        <SideNav 
          items={navItems}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          isQuickActionsOpen={isQuickActionsOpen}
          setIsQuickActionsOpen={setIsQuickActionsOpen}
        />
      </div>
      <div className={cn(
        "p-4 border-t mt-auto",
        sidebarCollapsed ? "text-center" : ""
      )}>
        <div className="flex items-center space-x-3">
          <div className={cn(
            "flex items-center space-x-3",
            sidebarCollapsed ? "justify-center" : ""
          )}>
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Next Service</p>
                <p className="text-xs text-gray-500 truncate">Dec 20, 2024 at 10:00 AM</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsQuickActionsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <DashboardLayout sidebar={sidebar} header={header}>
      <div className="bg-white rounded-lg shadow-sm">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="appointments/*" element={<Appointments />} />
          <Route path="billing/*" element={<Billing />} />
          <Route path="documents/*" element={<Documents />} />
          <Route path="media" element={<MediaUpload />} />
          <Route path="settings/*" element={<Settings />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
};
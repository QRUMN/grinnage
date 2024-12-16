import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../lib/utils';

interface Tab {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface TabNavProps {
  tabs: Tab[];
  className?: string;
  variant?: 'default' | 'pills' | 'minimal';
}

export const TabNav: React.FC<TabNavProps> = ({ 
  tabs, 
  className,
  variant = 'default' 
}) => {
  const variants = {
    default: {
      nav: "inline-flex h-9 items-center justify-center rounded-lg bg-gray-100 p-1",
      tab: "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      active: "bg-white text-gray-950 shadow-sm dark:bg-gray-800 dark:text-gray-50",
      inactive: "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
    },
    pills: {
      nav: "inline-flex h-9 items-center justify-center space-x-1",
      tab: "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      active: "bg-gray-900 text-gray-50 shadow-sm hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
      inactive: "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-800"
    },
    minimal: {
      nav: "inline-flex h-9 items-center justify-center space-x-2",
      tab: "inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      active: "text-gray-900 border-b-2 border-gray-900 dark:text-gray-50 dark:border-gray-50",
      inactive: "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
    }
  };

  const styles = variants[variant];

  return (
    <nav className={cn(styles.nav, className)}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            cn(
              styles.tab,
              isActive ? styles.active : styles.inactive,
              "gap-2"
            )
          }
        >
          {tab.icon}
          <span className="truncate">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

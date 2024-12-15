import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bug, LogOut } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  navItems: NavItem[];
  onLogout: () => void;
}

export const Sidebar = ({ navItems, onLogout }: SidebarProps) => {
  return (
    <div className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700">
      <div className="p-6 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center space-x-2">
          <Bug className="w-8 h-8 text-[#56e39f]" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</span>
        </div>
      </div>
      
      <nav className="p-4">
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-lg text-sm font-medium
                ${isActive 
                  ? 'bg-[#56e39f]/10 text-[#56e39f]' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                }
              `}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-dark-700">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
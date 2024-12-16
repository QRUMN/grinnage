import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { ChevronDown, ChevronRight, CircleDot, ChevronLeft, Search, Command } from 'lucide-react';
import { QuickActions } from './QuickActions';

interface SubNavItem {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: {
    count: number;
    variant: 'default' | 'warning' | 'error' | 'success';
  };
  subItems?: SubNavItem[];
}

interface SideNavProps {
  items: NavItem[];
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const SideNav = ({ 
  items, 
  className,
  collapsed = false,
  onToggleCollapse 
}: SideNavProps) => {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  const toggleExpand = (path: string) => {
    setExpandedItem(expandedItem === path ? null : path);
  };

  const getBadgeColor = (variant: NavItem['badge']['variant']) => {
    switch (variant) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = location.pathname === item.path;
    const isExpanded = expandedItem === item.path;
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <div key={item.path} className="space-y-1">
        <Link
          to={hasSubItems ? '#' : item.path}
          onClick={hasSubItems ? () => toggleExpand(item.path) : undefined}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors relative group",
            isActive
              ? "bg-primary text-white"
              : "text-gray-700 hover:bg-gray-100",
            collapsed && "justify-center"
          )}
        >
          <span className="flex items-center">
            {item.icon}
            {!collapsed && (
              <>
                <span className="ml-3">{item.label}</span>
                {hasSubItems && (
                  <span className="ml-auto">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>
                )}
              </>
            )}
          </span>
          
          {item.badge && (
            <span className={cn(
              "ml-auto px-2 py-0.5 text-xs font-medium rounded-full",
              getBadgeColor(item.badge.variant),
              collapsed && "absolute -top-1 -right-1"
            )}>
              {item.badge.count}
            </span>
          )}

          {collapsed && (
            <div className="absolute left-full ml-2 hidden group-hover:block z-50">
              <div className="bg-white px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
                {item.label}
              </div>
            </div>
          )}
        </Link>

        {!collapsed && hasSubItems && isExpanded && (
          <div className="ml-6 space-y-1">
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-lg transition-colors",
                  location.pathname === subItem.path
                    ? "bg-gray-100 text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <CircleDot className="h-2 w-2 mr-3" />
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <aside className={cn(
        "group/sidebar h-full bg-white border-r pt-16 relative duration-300",
        collapsed ? "w-20" : "w-64",
        className
      )}>
        <div className="p-2">
          <button
            onClick={() => setIsQuickActionsOpen(true)}
            className={cn(
              "flex items-center w-full gap-2 rounded-lg px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100",
              collapsed && "justify-center"
            )}
          >
            <Search className="h-4 w-4" />
            {!collapsed && (
              <span className="text-sm">Quick Actions (⌘K)</span>
            )}
          </button>
        </div>
        <div className={cn("flex flex-col", className)}>
          <nav className="space-y-1">
            {items.map(renderNavItem)}
          </nav>
          
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="mt-4 flex items-center justify-center px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  <span>Collapse</span>
                </>
              )}
            </button>
          )}
        </div>
      </aside>
      <QuickActions 
        isOpen={isQuickActionsOpen} 
        onClose={() => setIsQuickActionsOpen(false)} 
      />
    </>
  );
};

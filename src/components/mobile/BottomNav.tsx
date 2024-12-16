import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, FileText, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBottomNavigation } from '@/lib/utils/mobile';
import { vibrate } from '@/lib/utils/mobile';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Calendar, label: 'Calendar', path: '/dashboard/appointments' },
  { icon: FileText, label: 'Documents', path: '/dashboard/documents' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { height, visible, safeArea } = useBottomNavigation();

  if (!visible) return null;

  const handleNavigation = (path: string) => {
    vibrate(10); // Subtle haptic feedback
    navigate(path);
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'bg-background/80 backdrop-blur-lg border-t',
          'transition-colors duration-200'
        )}
        style={{ height: `${height}px`, paddingBottom: safeArea.bottom }}
      >
        <div className="grid h-14 grid-cols-4 items-center justify-items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-full',
                  'transition-colors duration-200',
                  'active:bg-accent/50 touch-manipulation',
                  isActive && 'text-primary',
                  !isActive && 'text-muted-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

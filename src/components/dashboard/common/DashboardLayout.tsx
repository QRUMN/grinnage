import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/mobile/BottomNav';
import { SwipeableView } from '@/components/mobile/SwipeableView';
import { PullToRefresh } from '@/components/mobile/PullToRefresh';
import { isMobile, useOrientation, vibrate } from '@/lib/utils/mobile';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  onRefresh?: () => Promise<void>;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  children,
  sidebarCollapsed = false,
  onSidebarToggle,
  onRefresh = async () => {}
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';

  const toggleMobileMenu = () => {
    vibrate(5); // Subtle haptic feedback
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on orientation change
  useEffect(() => {
    if (!isPortrait && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isPortrait, isMobileMenuOpen]);

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-background">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className={cn(
          "md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg",
          "bg-primary text-primary-foreground",
          "active:scale-95 transition-transform",
          "touch-manipulation"
        )}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <SwipeableView
            onSwipeLeft={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 md:hidden"
            threshold={50}
            preventScroll={true}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="h-full bg-background"
            >
              <div className="h-full overflow-y-auto pt-16 pb-4 safe-top">
                {sidebar}
              </div>
            </motion.div>
          </SwipeableView>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "hidden md:block transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        {sidebar}
      </div>

      {/* Main Content */}
      <main className={cn(
        "flex-1 overflow-hidden",
        "transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "blur-sm" : ""
      )}>
        <PullToRefresh onRefresh={onRefresh}>
          <div className={cn(
            "h-full overflow-y-auto",
            "px-4 md:px-6 py-4 md:py-6",
            "safe-top safe-bottom md:safe-top-0",
            isMobile() && "pb-20" // Space for bottom navigation
          )}>
            <div className="container mx-auto max-w-7xl">
              {children}
            </div>
          </div>
        </PullToRefresh>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
import React from 'react';
import { Bell, Check, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PageTransition } from '@/components/ui/page-transition';
import { useNotificationStore } from '@/lib/stores/notificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

export function Notifications() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    getUnreadCount,
  } = useNotificationStore();

  const unreadCount = getUnreadCount();

  return (
    <PageTransition>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({unreadCount} unread)
                </span>
              )}
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your notifications and preferences
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllNotificationsAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearNotifications}
              disabled={notifications.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <AnimatePresence mode="wait">
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center h-[400px] space-y-4"
              >
                <Bell className="h-12 w-12 text-muted-foreground/50" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up! Check back later for updates.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="space-y-4"
              >
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <Card
                      className={cn(
                        "p-4 transition-colors",
                        !notification.read && "bg-muted/50 dark:bg-muted/10"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium leading-none">
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-primary-foreground">
                                New
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(notification.date, 'PPp')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markNotificationAsRead(notification.id)}
                            disabled={notification.read}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </div>
    </PageTransition>
  );
}

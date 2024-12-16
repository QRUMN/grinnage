import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useNotificationStore } from '@/lib/stores/notificationStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Trash2, AlertTriangle, Info } from 'lucide-react';

export const Notifications = () => {
  const {
    notifications,
    markAsRead,
    dismissNotification,
    clearAllNotifications,
    getUnreadCount
  } = useNotificationStore();

  const unreadCount = getUnreadCount();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'info':
        return <Info className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <div className="bg-background rounded-lg shadow-sm border">
        {/* Header */}
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="secondary">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllNotifications}
                className="w-full md:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y">
          <AnimatePresence initial={false}>
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 text-center text-muted-foreground"
              >
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No notifications yet</p>
              </motion.div>
            ) : (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "p-4 md:p-6",
                    !notification.read && "bg-accent/5"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <p className="font-medium">{notification.title}</p>
                        <time className="text-sm text-muted-foreground">
                          {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                        </time>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="w-full md:w-auto"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissNotification(notification.id)}
                        className="w-full md:w-auto"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Dismiss</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

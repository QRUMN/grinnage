import React from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

export function Notifications() {
  const notifications = [
    {
      id: 1,
      title: 'Appointment Reminder',
      message: 'Your pest control service is scheduled for tomorrow at 10:00 AM',
      date: '1 hour ago',
      type: 'reminder',
      unread: true,
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Thank you for your payment of $150.00',
      date: '2 hours ago',
      type: 'payment',
      unread: true,
    },
    {
      id: 3,
      title: 'Service Report',
      message: 'Your latest service report is now available',
      date: '1 day ago',
      type: 'report',
      unread: true,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Manage your notifications and preferences
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
          <Button variant="outline" size="sm">
            Clear all
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={cn(
              "p-4 transition-colors",
              notification.unread && "bg-muted/50"
            )}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium leading-none">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

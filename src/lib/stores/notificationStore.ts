import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  date: Date;
  read: boolean;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  date: Date;
  dismissed: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  alerts: Alert[];
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'date' | 'dismissed'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  dismissAlert: (id: string) => void;
  dismissAllAlerts: () => void;
  clearNotifications: () => void;
  clearAlerts: () => void;
  getUnreadCount: () => number;
  getActiveAlertsCount: () => number;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      alerts: [],
      
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: crypto.randomUUID(),
            date: new Date(),
            read: false,
          },
          ...state.notifications,
        ],
      })),

      addAlert: (alert) => set((state) => ({
        alerts: [
          {
            ...alert,
            id: crypto.randomUUID(),
            date: new Date(),
            dismissed: false,
          },
          ...state.alerts,
        ],
      })),

      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      })),

      markAllNotificationsAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      })),

      dismissAlert: (id) => set((state) => ({
        alerts: state.alerts.map((a) =>
          a.id === id ? { ...a, dismissed: true } : a
        ),
      })),

      dismissAllAlerts: () => set((state) => ({
        alerts: state.alerts.map((a) => ({ ...a, dismissed: true })),
      })),

      clearNotifications: () => set({ notifications: [] }),
      
      clearAlerts: () => set({ alerts: [] }),

      getUnreadCount: () => get().notifications.filter((n) => !n.read).length,
      
      getActiveAlertsCount: () => get().alerts.filter((a) => !a.dismissed).length,
    }),
    {
      name: 'notification-store',
    }
  )
);

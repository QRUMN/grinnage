import axios from 'axios';
import { User, UserActivity, BatchUserOperation, UserSession } from '@/types/user';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Error handling middleware
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export const userApi = {
  // User CRUD operations
  getUsers: async (params: { page: number; limit: number; search?: string; filters?: Record<string, any> }) => {
    const response = await api.get('/api/users', { params });
    return response.data;
  },

  getUserById: async (id: string) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },

  createUser: async (userData: Partial<User>) => {
    const response = await api.post('/api/users', userData);
    return response.data;
  },

  updateUser: async (id: string, userData: Partial<User>) => {
    const response = await api.patch(`/api/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string) => {
    await api.delete(`/api/users/${id}`);
  },

  // Batch operations
  batchOperation: async (operation: BatchUserOperation) => {
    const response = await api.post('/api/users/batch', operation);
    return response.data;
  },

  // Activity logs
  getUserActivity: async (userId: string, params: { page: number; limit: number }) => {
    const response = await api.get(`/api/users/${userId}/activity`, { params });
    return response.data;
  },

  // Session management
  getUserSessions: async (userId: string) => {
    const response = await api.get(`/api/users/${userId}/sessions`);
    return response.data;
  },

  terminateSession: async (userId: string, sessionId: string) => {
    await api.delete(`/api/users/${userId}/sessions/${sessionId}`);
  },

  terminateAllSessions: async (userId: string, exceptCurrent: boolean = true) => {
    await api.delete(`/api/users/${userId}/sessions`, { params: { exceptCurrent } });
  },

  // User impersonation
  startImpersonation: async (userId: string) => {
    const response = await api.post(`/api/users/${userId}/impersonate`);
    return response.data;
  },

  stopImpersonation: async () => {
    await api.post('/api/users/stop-impersonation');
  },

  // Analytics
  getUserAnalytics: async (params: { startDate: string; endDate: string }) => {
    const response = await api.get('/api/users/analytics', { params });
    return response.data;
  },
};

import { axiosInstance } from './axios';
import type { Client, ServiceRecord } from '../../types/client';

export const clientApi = {
  getClientProfile: async (clientId: string) => {
    const { data } = await axiosInstance.get<Client>(`/clients/${clientId}`);
    return data;
  },

  updateClientProfile: async (clientId: string, updates: Partial<Client>) => {
    const { data } = await axiosInstance.patch<Client>(`/clients/${clientId}`, updates);
    return data;
  },

  getServiceHistory: async (clientId: string) => {
    const { data } = await axiosInstance.get<ServiceRecord[]>(`/clients/${clientId}/services`);
    return data;
  },

  scheduleService: async (clientId: string, serviceDetails: Partial<ServiceRecord>) => {
    const { data } = await axiosInstance.post<ServiceRecord>(
      `/clients/${clientId}/services`,
      serviceDetails
    );
    return data;
  },
};
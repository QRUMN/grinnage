import axios from 'axios';

const API_URL = process.env.VITE_API_URL;

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  type: string;
  status: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceHistory {
  id: string;
  propertyId: string;
  serviceType: string;
  description: string;
  date: string;
  technicianId: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TreatmentProtocol {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  frequency: string;
  lastPerformed?: string;
  nextDue?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const propertyApi = {
  getProperties: async (params: {
    page: number;
    limit: number;
    search?: string;
    filters?: Record<string, any>;
  }) => {
    const response = await axios.get(`${API_URL}/properties`, { params });
    return response.data;
  },

  getPropertyById: async (id: string) => {
    const response = await axios.get(`${API_URL}/properties/${id}`);
    return response.data;
  },

  createProperty: async (data: Partial<Property>) => {
    const response = await axios.post(`${API_URL}/properties`, data);
    return response.data;
  },

  updateProperty: async (id: string, data: Partial<Property>) => {
    const response = await axios.put(`${API_URL}/properties/${id}`, data);
    return response.data;
  },

  deleteProperty: async (id: string) => {
    const response = await axios.delete(`${API_URL}/properties/${id}`);
    return response.data;
  },

  getServiceHistory: async (propertyId: string) => {
    const response = await axios.get(`${API_URL}/properties/${propertyId}/services`);
    return response.data;
  },

  addServiceRecord: async (propertyId: string, data: Partial<ServiceHistory>) => {
    const response = await axios.post(`${API_URL}/properties/${propertyId}/services`, data);
    return response.data;
  },

  getTreatmentProtocols: async (propertyId: string) => {
    const response = await axios.get(`${API_URL}/properties/${propertyId}/protocols`);
    return response.data;
  },

  addTreatmentProtocol: async (propertyId: string, data: Partial<TreatmentProtocol>) => {
    const response = await axios.post(`${API_URL}/properties/${propertyId}/protocols`, data);
    return response.data;
  },

  updateTreatmentProtocol: async (propertyId: string, protocolId: string, data: Partial<TreatmentProtocol>) => {
    const response = await axios.put(`${API_URL}/properties/${propertyId}/protocols/${protocolId}`, data);
    return response.data;
  },

  deleteTreatmentProtocol: async (propertyId: string, protocolId: string) => {
    const response = await axios.delete(`${API_URL}/properties/${propertyId}/protocols/${protocolId}`);
    return response.data;
  },
};

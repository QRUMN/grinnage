import axios from 'axios';

const API_URL = process.env.VITE_API_URL;

export interface Transaction {
  id: string;
  userId: string;
  type: 'payment' | 'refund' | 'charge';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'bank_account';
  isDefault: boolean;
  last4: string;
  brand?: string;
  expiryMonth?: string;
  expiryYear?: string;
  bankName?: string;
  accountType?: string;
  createdAt: string;
  updatedAt: string;
}

export const walletApi = {
  getTransactions: async (params: {
    page: number;
    limit: number;
    search?: string;
    filters?: Record<string, any>;
  }) => {
    const response = await axios.get(`${API_URL}/transactions`, { params });
    return response.data;
  },

  getTransactionById: async (id: string) => {
    const response = await axios.get(`${API_URL}/transactions/${id}`);
    return response.data;
  },

  createTransaction: async (data: Partial<Transaction>) => {
    const response = await axios.post(`${API_URL}/transactions`, data);
    return response.data;
  },

  getPaymentMethods: async () => {
    const response = await axios.get(`${API_URL}/payment-methods`);
    return response.data;
  },

  addPaymentMethod: async (data: Partial<PaymentMethod>) => {
    const response = await axios.post(`${API_URL}/payment-methods`, data);
    return response.data;
  },

  updatePaymentMethod: async (id: string, data: Partial<PaymentMethod>) => {
    const response = await axios.put(`${API_URL}/payment-methods/${id}`, data);
    return response.data;
  },

  deletePaymentMethod: async (id: string) => {
    const response = await axios.delete(`${API_URL}/payment-methods/${id}`);
    return response.data;
  },

  setDefaultPaymentMethod: async (id: string) => {
    const response = await axios.post(`${API_URL}/payment-methods/${id}/default`);
    return response.data;
  },

  getWalletBalance: async () => {
    const response = await axios.get(`${API_URL}/wallet/balance`);
    return response.data;
  },

  getWalletStats: async (params: { 
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await axios.get(`${API_URL}/wallet/stats`, { params });
    return response.data;
  },
};

import axios from 'axios';

const API_URL = process.env.VITE_API_URL;

export interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface HelpCategory {
  id: string;
  name: string;
  description: string;
  articleCount: number;
}

export const helpService = {
  getArticles: async (params: {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    tags?: string[];
  }) => {
    const response = await axios.get(`${API_URL}/help/articles`, { params });
    return response.data;
  },

  getArticleById: async (id: string) => {
    const response = await axios.get(`${API_URL}/help/articles/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axios.get(`${API_URL}/help/categories`);
    return response.data;
  },

  searchArticles: async (query: string) => {
    const response = await axios.get(`${API_URL}/help/search`, {
      params: { q: query },
    });
    return response.data;
  },

  createArticle: async (data: Partial<HelpArticle>) => {
    const response = await axios.post(`${API_URL}/help/articles`, data);
    return response.data;
  },

  updateArticle: async (id: string, data: Partial<HelpArticle>) => {
    const response = await axios.put(`${API_URL}/help/articles/${id}`, data);
    return response.data;
  },

  deleteArticle: async (id: string) => {
    const response = await axios.delete(`${API_URL}/help/articles/${id}`);
    return response.data;
  },
};

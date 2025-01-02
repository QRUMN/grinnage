import { User, UserRole } from '@/store/auth';

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'user' | 'manager' | 'admin';
  companyName?: string;
  companySize?: string;
}

// Mock API service for authentication
export const authApi = {
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login
    const mockUsers: Record<string, User> = {
      'user@example.com': {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'manager@example.com': {
        id: '2',
        email: 'manager@example.com',
        name: 'Jane Smith',
        role: 'manager',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'admin@example.com': {
        id: '3',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

    const user = mockUsers[credentials.email];
    if (!user || credentials.password !== 'password123') {
      throw new Error('Invalid email or password');
    }

    return {
      user,
      token: 'mock-jwt-token',
    };
  },

  register: async (data: RegisterData): Promise<RegisterResponse> => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful registration
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      name: data.name,
      role: data.userType,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      companyName: data.companyName,
      companySize: data.companySize,
    };

    return {
      user,
      token: 'mock-jwt-token',
    };
  },

  getCurrentUser: async (): Promise<User> => {
    // In a real app, this would validate the JWT token and return the current user
    // For demo purposes, we'll return a mock user
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

    const mockUser: User = {
      id: '1',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return mockUser;
  },

  logout: async (): Promise<void> => {
    // In a real app, this would invalidate the JWT token
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  },

  forgotPassword: async (email: string): Promise<void> => {
    // In a real app, this would trigger a password reset email
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    // In a real app, this would validate the reset token and update the password
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  },
};
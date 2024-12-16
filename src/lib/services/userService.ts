import { UserFormData } from '../validations/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new ApiError(response.status, error.message);
  }
  return response.json();
}

export interface UserResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export const userService = {
  async createUser(userData: UserFormData): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any auth headers here
        },
        body: JSON.stringify(userData),
      });

      return handleResponse<UserResponse>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to create user. Please try again later.');
    }
  },

  async updateUser(userId: string, userData: Partial<UserFormData>): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Add any auth headers here
        },
        body: JSON.stringify(userData),
      });

      return handleResponse<UserResponse>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to update user. Please try again later.');
    }
  },

  async getUser(userId: string): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        headers: {
          // Add any auth headers here
        },
      });

      return handleResponse<UserResponse>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch user. Please try again later.');
    }
  },

  async getUsers(params: Record<string, any> = {}): Promise<{ users: UserResponse[]; total: number }> {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/api/users?${queryString}`, {
        headers: {
          // Add any auth headers here
        },
      });

      return handleResponse<{ users: UserResponse[]; total: number }>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch users. Please try again later.');
    }
  },

  async deleteUser(userId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          // Add any auth headers here
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to delete user' }));
        throw new ApiError(response.status, error.message);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to delete user. Please try again later.');
    }
  },
};

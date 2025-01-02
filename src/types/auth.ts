import { z } from 'zod';

export type UserRole = 'user' | 'admin' | 'manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  clientType?: 'residential' | 'commercial';
  companyName?: string;
  companySize?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive' | 'suspended';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  userType: z.enum(['residential', 'commercial', 'admin'])
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  userType: z.enum(['residential', 'commercial']),
  companyName: z.string().optional(),
  companySize: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

export interface Permission {
  id: string;
  name: string;
  description: string;
  code: string;
}
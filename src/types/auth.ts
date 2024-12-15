import { z } from 'zod';

export type UserRole = 'residential' | 'commercial' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  clientType?: 'residential' | 'commercial';
  companyName?: string;
  companySize?: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  userType: z.enum(['residential', 'commercial', 'admin'])
});

export type LoginFormData = z.infer<typeof loginSchema>;
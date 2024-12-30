export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  lastLogin: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
  twoFactorEnabled: boolean;
  permissions: string[];
}

export type UserRole = 
  | 'RESIDENTIAL_CUSTOMER'
  | 'COMMERCIAL_CUSTOMER'
  | 'ADMINISTRATOR'
  | 'TECHNICIAN'
  | 'MANAGER'
  | 'SUPPORT'
  | 'VENDOR'
  | 'CONTRACTOR'
  | 'BILLING_ADMIN'
  | 'QUALITY_INSPECTOR';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  ipAddress: string;
  userAgent: string;
  lastActive: string;
  expiresAt: string;
}

export interface BatchUserOperation {
  userIds: string[];
  operation: 'DELETE' | 'UPDATE_ROLE' | 'SUSPEND' | 'ACTIVATE';
  newValue?: string;
}

export interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  usersByRole: Record<string, number>;
  usersByStatus: Record<string, number>;
  registrationTrend: TimeSeriesData[];
  loginActivity: TimeSeriesData[];
  failedLogins: TimeSeriesData[];
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

export interface UserActivityMetrics {
  lastLogin: string;
  totalLogins: number;
  averageSessionDuration: number;
  failedLoginAttempts: number;
  documentsUploaded: number;
  actionsPerformed: number;
}

export interface AnalyticsFilter {
  startDate: string;
  endDate: string;
  roles?: string[];
  status?: string[];
  actions?: string[];
}

export interface ReportConfig {
  type: 'user_activity' | 'system_usage' | 'security_audit' | 'custom';
  filters: AnalyticsFilter;
  metrics: string[];
  groupBy?: string[];
  format: 'csv' | 'pdf' | 'excel';
}

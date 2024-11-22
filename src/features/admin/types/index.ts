export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'support';
  status: 'active' | 'inactive';
  lastLogin: Date;
  createdAt: Date;
}

export interface AdminOrganization {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'suspended' | 'cancelled';
  plan: 'free' | 'pro' | 'enterprise';
  userCount: number;
  createdAt: Date;
  billingStatus: 'active' | 'past_due' | 'cancelled';
}

export interface AdminMetrics {
  totalOrganizations: number;
  activeUsers: number;
  monthlyRevenue: number;
  activeProjects: number;
  dailyActiveUsers: number[];
  userGrowth: {
    date: string;
    count: number;
  }[];
}
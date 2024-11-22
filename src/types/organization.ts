import { Timestamp } from 'firebase/firestore';

export interface Organization {
  id: string;
  name: string;
  description: string;
  users: string[]; // Array of user document references
  createdAt: Timestamp;
  updatedAt: Timestamp;
  maxUserCount: number;
  userCount: number;
  stripeCustomerId: string;
  domains: string[];
  orgCheck: boolean;
  codeCheck: boolean;
  profileCheck: boolean;
  companyCamId: string;
}

export interface OrganizationFormData {
  name: string;
  description: string;
  maxUserCount: number;
  domains: string[];
}

export type OrganizationStatus = 'active' | 'suspended' | 'cancelled';
export type OrganizationPlan = 'free' | 'pro' | 'enterprise';
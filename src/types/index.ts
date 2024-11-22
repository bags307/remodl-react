export interface Organization {
  id: string;
  name: string;
  users: User[];
  vendors: Vendor[];
  properties: Property[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  orgId: string;
}

export interface Property {
  id: string;
  address: string;
  type: 'SFR' | 'Multi-Family';
  units?: number;
  projects: Project[];
  status: 'active' | 'pending' | 'completed';
}

export interface Project {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  budget: Budget;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: Date;
  endDate: Date;
  workOrders: WorkOrder[];
  documents: Document[];
}

export interface WorkOrder {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedVendor?: Vendor;
  status: 'draft' | 'pending' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  tasks: Task[];
  checklist: ChecklistItem[];
  startDate?: Date;
  dueDate?: Date;
}

export interface Task {
  id: string;
  workOrderId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignee?: User;
}

export interface Budget {
  total: number;
  allocated: {
    materials: number;
    labor: number;
    permits: number;
    other: number;
  };
  spent: {
    materials: number;
    labor: number;
    permits: number;
    other: number;
  };
}

export interface Vendor {
  id: string;
  name: string;
  type: string[];
  contact: {
    email: string;
    phone: string;
  };
  status: 'active' | 'inactive';
}

export interface Document {
  id: string;
  title: string;
  type: 'scope' | 'estimate' | 'contract' | 'invoice' | 'other';
  url: string;
  createdAt: Date;
  createdBy: string;
}
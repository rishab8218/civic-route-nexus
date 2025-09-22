// Civic Issue Reporting System Types

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: Priority;
  status: IssueStatus;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  reportedBy: {
    name: string;
    email: string;
    phone?: string;
  };
  assignedTo?: {
    department: Department;
    staffMember?: string;
  };
  photos: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  estimatedResolution?: string;
}

export type IssueCategory = 
  | 'pothole'
  | 'streetlight'
  | 'trash'
  | 'graffiti'
  | 'water-leak'
  | 'traffic-signal'
  | 'park-maintenance'
  | 'other';

export type Priority = 'urgent' | 'high' | 'medium' | 'low';

export type IssueStatus = 'new' | 'acknowledged' | 'in-progress' | 'resolved';

export type Department = 
  | 'public-works'
  | 'sanitation'
  | 'parks-recreation'
  | 'traffic'
  | 'utilities'
  | 'code-enforcement';

export interface DashboardStats {
  totalReports: number;
  newReports: number;
  inProgress: number;
  resolved: number;
  averageResponseTime: number; // in hours
  resolvedToday: number;
  pendingAssignment: number;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  department: Department;
  role: 'admin' | 'supervisor' | 'staff';
  active: boolean;
  assignedIssues: number;
}
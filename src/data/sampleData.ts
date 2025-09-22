import { CivicIssue, DashboardStats, StaffMember } from '@/types/civic';

export const sampleIssues: CivicIssue[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'Deep pothole near the intersection of Main St and 5th Ave causing vehicle damage. Approximately 3 feet wide and 6 inches deep.',
    category: 'pothole',
    priority: 'urgent',
    status: 'acknowledged',
    location: {
      address: '1247 Main Street, Downtown',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    reportedBy: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567'
    },
    assignedTo: {
      department: 'public-works',
      staffMember: 'Mike Rodriguez'
    },
    photos: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'],
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    estimatedResolution: '2024-01-17T16:00:00Z'
  },
  {
    id: '2',
    title: 'Broken streetlight on Oak Avenue',
    description: 'Streetlight pole #4578 is not functioning. Light has been out for 3 days creating safety concerns for pedestrians.',
    category: 'streetlight',
    priority: 'high',
    status: 'in-progress',
    location: {
      address: '890 Oak Avenue, Riverside District',
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    reportedBy: {
      name: 'Robert Chen',
      email: 'r.chen@email.com'
    },
    assignedTo: {
      department: 'utilities',
      staffMember: 'Jessica Martinez'
    },
    photos: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500'],
    createdAt: '2024-01-14T19:45:00Z',
    updatedAt: '2024-01-15T09:20:00Z',
    estimatedResolution: '2024-01-16T14:00:00Z'
  },
  {
    id: '3',
    title: 'Overflowing trash bin at Central Park',
    description: 'Trash receptacle near the main entrance is overflowing with garbage scattered around the area.',
    category: 'trash',
    priority: 'medium',
    status: 'resolved',
    location: {
      address: 'Central Park Main Entrance, Park District',
      coordinates: { lat: 40.7829, lng: -73.9654 }
    },
    reportedBy: {
      name: 'Maria Gonzalez',
      email: 'maria.g@email.com',
      phone: '(555) 987-6543'
    },
    assignedTo: {
      department: 'sanitation',
      staffMember: 'David Wilson'
    },
    photos: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500'],
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-14T16:30:00Z',
    resolvedAt: '2024-01-14T16:30:00Z'
  },
  {
    id: '4',
    title: 'Graffiti on building wall',
    description: 'Large graffiti on the side wall of the community center. Needs cleaning and potential surveillance.',
    category: 'graffiti',
    priority: 'low',
    status: 'new',
    location: {
      address: '456 Community Center Drive, Arts District',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    reportedBy: {
      name: 'Thomas Wilson',
      email: 'twilson@email.com'
    },
    photos: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500'],
    createdAt: '2024-01-15T14:10:00Z',
    updatedAt: '2024-01-15T14:10:00Z'
  },
  {
    id: '5',
    title: 'Water leak on Elm Street',
    description: 'Visible water leak from underground pipe causing street flooding and potential safety hazard.',
    category: 'water-leak',
    priority: 'urgent',
    status: 'in-progress',
    location: {
      address: '234 Elm Street, Residential Area',
      coordinates: { lat: 40.7282, lng: -73.9942 }
    },
    reportedBy: {
      name: 'Jennifer Adams',
      email: 'j.adams@email.com',
      phone: '(555) 456-7890'
    },
    assignedTo: {
      department: 'utilities',
      staffMember: 'Carlos Rivera'
    },
    photos: ['https://images.unsplash.com/photo-1581594549595-35f6edc4b22d?w=500'],
    createdAt: '2024-01-15T06:45:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    estimatedResolution: '2024-01-16T12:00:00Z'
  }
];

export const dashboardStats: DashboardStats = {
  totalReports: 847,
  newReports: 23,
  inProgress: 56,
  resolved: 768,
  averageResponseTime: 18.5,
  resolvedToday: 12,
  pendingAssignment: 8
};

export const staffMembers: StaffMember[] = [
  {
    id: '1',
    name: 'Mike Rodriguez',
    email: 'mrodriguez@city.gov',
    department: 'public-works',
    role: 'supervisor',
    active: true,
    assignedIssues: 12
  },
  {
    id: '2',
    name: 'Jessica Martinez',
    email: 'jmartinez@city.gov',
    department: 'utilities',
    role: 'staff',
    active: true,
    assignedIssues: 8
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'dwilson@city.gov',
    department: 'sanitation',
    role: 'staff',
    active: true,
    assignedIssues: 15
  },
  {
    id: '4',
    name: 'Carlos Rivera',
    email: 'crivera@city.gov',
    department: 'utilities',
    role: 'staff',
    active: true,
    assignedIssues: 6
  }
];
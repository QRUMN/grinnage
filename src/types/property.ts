export interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  size: string;
  status: 'active' | 'inactive' | 'pending';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  lastServiceDate?: string;
  nextServiceDate?: string;
  images?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRecord {
  id: string;
  propertyId: string;
  date: string;
  type: string;
  technician: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TreatmentProtocol {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  frequency: string;
  lastApplied?: string;
  nextDue?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

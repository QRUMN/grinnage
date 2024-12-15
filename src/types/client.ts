export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  clientType: 'residential' | 'commercial';
  propertySize: string;
  serviceHistory: ServiceRecord[];
  activeSubscription?: ServicePackage;
}

export interface ServiceRecord {
  id: string;
  date: string;
  type: string;
  technician: string;
  notes: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

export interface ServicePackage {
  id: string;
  name: string;
  frequency: 'weekly' | 'monthly' | 'quarterly';
  price: number;
  includedServices: string[];
  nextServiceDate?: string;
}
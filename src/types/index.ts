export interface OnboardingFormData {
  pestType: string;
  clientType: 'residential' | 'commercial';
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  propertySize: string;
  problemArea: string; // Added field for problem area location
  pestProblem: string;
  preferredDate?: string;
  additionalNotes?: string;
}

export * from './auth';
export * from './client';
export * from './payment';
export * from './pest';
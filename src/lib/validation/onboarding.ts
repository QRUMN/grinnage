import { z } from 'zod';

export const onboardingSchema = z.object({
  pestType: z.string().min(1, 'Please select a pest type'),
  clientType: z.enum(['residential', 'commercial']),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(5, 'Valid street address required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  propertySize: z.string().min(1, 'Property size is required'),
  problemArea: z.string().min(5, 'Please specify the problem area'),
  pestProblem: z.string().min(10, 'Please describe the pest problem'),
  preferredDate: z.string().optional(),
  additionalNotes: z.string().optional(),
});
import * as z from 'zod';

export const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
export const zipCodeRegex = /^\d{5}(-\d{4})?$/;
export const stateRegex = /^[A-Z]{2}$/;

export const userRoles = [
  "RESIDENTIAL_CUSTOMER",
  "COMMERCIAL_CUSTOMER",
  "ADMINISTRATOR",
  "TECHNICIAN",
  "MANAGER",
  "SUPPORT",
  "VENDOR",
  "CONTRACTOR",
  "BILLING_ADMIN",
  "QUALITY_INSPECTOR"
] as const;

export const userSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  
  phone: z.string()
    .regex(phoneRegex, 'Invalid phone number format. Use (XXX) XXX-XXXX'),
  
  role: z.enum(userRoles),
  
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be less than 100 characters'),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .regex(/^[a-zA-Z\s.-]+$/, 'City can only contain letters, spaces, periods, and hyphens'),
  
  state: z.string()
    .regex(stateRegex, 'State must be a valid 2-letter US state code (e.g., NY)')
    .toUpperCase(),
  
  zipCode: z.string()
    .regex(zipCodeRegex, 'Invalid ZIP code format. Use XXXXX or XXXXX-XXXX'),
  
  company: z.string()
    .optional()
    .nullable()
    .refine((val) => !val || val.length >= 2, 'Company name must be at least 2 characters')
    .refine((val) => !val || val.length <= 100, 'Company name must be less than 100 characters'),
  
  notes: z.string()
    .optional()
    .nullable()
    .refine((val) => !val || val.length <= 500, 'Notes must be less than 500 characters'),
  
  preferredContactMethod: z.enum(['email', 'phone', 'sms'])
    .default('email'),
  
  status: z.enum(['active', 'inactive', 'pending'])
    .default('pending'),
  
  serviceFrequency: z.enum(['weekly', 'biweekly', 'monthly', 'quarterly', 'asNeeded'])
    .optional(),
  
  billingInfo: z.object({
    paymentMethod: z.enum(['credit', 'debit', 'ach', 'check', 'cash'])
      .optional(),
    billingAddress: z.boolean()
      .default(true)
      .describe('Use same as service address'),
  }).optional(),
  
  documents: z.array(z.object({
    id: z.string().optional(),
    name: z.string(),
    url: z.string().url(),
    type: z.enum(["ID", "LICENSE", "INSURANCE", "CONTRACT", "OTHER"]),
    uploadedAt: z.date().optional(),
  })).optional(),
});

export type UserFormData = z.infer<typeof userSchema>;

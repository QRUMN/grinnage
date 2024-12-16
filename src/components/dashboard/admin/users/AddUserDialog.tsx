import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/Dialog';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/Select';
import { Textarea } from '../../../ui/Textarea';
import { toast } from 'sonner';
import { userSchema, type UserFormData } from '../../../../lib/validations/user';
import { userService } from '../../../../lib/services/userService';
import { Loader2 } from 'lucide-react';
import InputMask from 'react-input-mask';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { FileUpload } from './FileUpload';

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

const initialFormData: UserFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'residential',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  company: '',
  notes: '',
  preferredContactMethod: 'email',
  status: 'pending',
  serviceFrequency: 'monthly',
  billingInfo: {
    paymentMethod: 'credit',
    billingAddress: true,
  },
  documents: [],
};

export function AddUserDialog({ isOpen, onClose, onUserAdded }: AddUserDialogProps) {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components || [];
      
      let streetNumber = '', route = '', city = '', state = '', zipCode = '';
      
      addressComponents.forEach(component => {
        const types = component.types;
        if (types.includes('street_number')) {
          streetNumber = component.long_name;
        } else if (types.includes('route')) {
          route = component.long_name;
        } else if (types.includes('locality')) {
          city = component.long_name;
        } else if (types.includes('administrative_area_level_1')) {
          state = component.short_name;
        } else if (types.includes('postal_code')) {
          zipCode = component.long_name;
        }
      });

      setFormData((prev) => ({ ...prev, address: `${streetNumber} ${route}`.trim(), city, state, zipCode }));
    }
  };

  const validateForm = async () => {
    try {
      await userSchema.parseAsync(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const zodError = error as any;
        const newErrors: Record<string, string> = {};
        zodError.errors?.forEach((err: any) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        
        // Show first error in toast
        const firstError = zodError.errors?.[0];
        if (firstError) {
          toast.error(firstError.message);
        }
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) return;

    setIsLoading(true);

    try {
      const response = await userService.createUser(formData);
      
      toast.success('User created successfully!', {
        description: `${formData.firstName} ${formData.lastName} has been added to the system.`,
      });
      
      onUserAdded();
      onClose();
      setFormData(initialFormData);
      setCurrentStep(1);
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to create user', {
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (url: string, name: string) => {
    setFormData((prev) => ({ ...prev, documents: [...prev.documents, { name, url, type: 'OTHER', uploadedAt: new Date() }] }));
  };

  const renderStep1 = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            required
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            required
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <InputMask
            mask="(999) 999-9999"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            placeholder="(XXX) XXX-XXXX"
            required
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role">User Role *</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleSelectChange('role', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential Customer</SelectItem>
              <SelectItem value="commercial">Commercial Customer</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="technician">Technician</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredContactMethod">Preferred Contact *</Label>
          <Select
            value={formData.preferredContactMethod}
            onValueChange={(value) => handleSelectChange('preferredContactMethod', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      {isLoaded && (
        <Autocomplete
          onLoad={setAutocomplete}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Search for address..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </Autocomplete>
      )}
      <div className="space-y-2">
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          error={errors.city}
          required
        />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            error={errors.state}
            placeholder="NY"
            maxLength={2}
            required
          />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <InputMask
            mask="99999-9999"
            maskChar={null}
            value={formData.zipCode}
            onChange={handleInputChange}
            error={errors.zipCode}
            placeholder="12345"
            required
          />
          {errors.zipCode && (
            <p className="text-sm text-red-500">{errors.zipCode}</p>
          )}
        </div>
      </div>

      {formData.role === 'commercial' && (
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            name="company"
            value={formData.company || ''}
            onChange={handleInputChange}
            error={errors.company}
          />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company}</p>
          )}
        </div>
      )}
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="serviceFrequency">Service Frequency</Label>
        <Select
          value={formData.serviceFrequency}
          onValueChange={(value) => handleSelectChange('serviceFrequency', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="biweekly">Bi-weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="asNeeded">As Needed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes || ''}
          onChange={handleInputChange}
          error={errors.notes}
          placeholder="Enter any additional notes or special instructions..."
          rows={4}
        />
        {errors.notes && (
          <p className="text-sm text-red-500">{errors.notes}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Payment Method</Label>
        <Select
          value={formData.billingInfo?.paymentMethod}
          onValueChange={(value) => 
            setFormData(prev => ({
              ...prev,
              billingInfo: { ...prev.billingInfo, paymentMethod: value }
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="credit">Credit Card</SelectItem>
            <SelectItem value="debit">Debit Card</SelectItem>
            <SelectItem value="ach">ACH Transfer</SelectItem>
            <SelectItem value="check">Check</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Documents</Label>
        <FileUpload
          onUploadComplete={handleFileUpload}
        />
        <div className="mt-2">
          {formData.documents?.map((doc, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-sm">{doc.name}</span>
              <button
                type="button"
                onClick={() => {
                  const docs = formData.documents || [];
                  setFormData((prev) => ({ ...prev, documents: docs.filter((_, i) => i !== index) }));
                }}
                className="text-destructive hover:text-destructive/90"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Step {currentStep} of 3: {currentStep === 1 ? 'Basic Information' : currentStep === 2 ? 'Address Details' : 'Service & Billing'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => currentStep > 1 && setCurrentStep(step => step - 1)}
                disabled={currentStep === 1 || isLoading}
              >
                Previous
              </Button>
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(step => step + 1)}
                    disabled={isLoading}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Creating...' : 'Create User'}
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

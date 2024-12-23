import React from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { FormInput } from '@/components/common/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const paymentMethodSchema = z.object({
  cardNumber: z.string().min(16).max(16),
  expiryMonth: z.string().min(2).max(2),
  expiryYear: z.string().min(2).max(2),
  cvv: z.string().min(3).max(4),
  name: z.string().min(1, 'Name is required'),
});

type PaymentMethodForm = z.infer<typeof paymentMethodSchema>;

export const AddPaymentMethod = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PaymentMethodForm>({
    resolver: zodResolver(paymentMethodSchema),
  });

  const onSubmit = async (data: PaymentMethodForm) => {
    try {
      // Add API call here to save payment method
      console.log('Payment method data:', data);
      toast.success('Payment method added successfully');
      reset();
    } catch (error) {
      toast.error('Failed to add payment method');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          <span>Add New</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Card Number"
            {...register('cardNumber')}
            error={errors.cardNumber?.message}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label="Month"
              {...register('expiryMonth')}
              error={errors.expiryMonth?.message}
            />
            <FormInput
              label="Year"
              {...register('expiryYear')}
              error={errors.expiryYear?.message}
            />
            <FormInput
              label="CVV"
              type="password"
              {...register('cvv')}
              error={errors.cvv?.message}
            />
          </div>
          <FormInput
            label="Name on Card"
            {...register('name')}
            error={errors.name?.message}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Payment Method'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

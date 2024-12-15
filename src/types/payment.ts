export interface Invoice {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  serviceDate: string;
  description: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  isDefault: boolean;
}
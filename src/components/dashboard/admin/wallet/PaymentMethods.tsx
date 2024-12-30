import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import {
  CreditCard,
  Wallet,
  Bank,
  Plus,
  Edit,
  Trash,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { walletApi } from '@/lib/api/wallet';
import { Dialog } from '@/components/ui/Dialog';
import { PaymentMethodForm } from './PaymentMethodForm';

interface PaymentMethod {
  id: string;
  type: 'CARD' | 'BANK' | 'WALLET';
  name: string;
  details: {
    last4?: string;
    brand?: string;
    bankName?: string;
    accountType?: string;
  };
  isDefault: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  expiryDate?: string;
}

export function PaymentMethods() {
  const queryClient = useQueryClient();
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = React.useState(false);

  const { data: methods, isLoading } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: () => walletApi.getPaymentMethods(),
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; updates: any }) =>
      walletApi.updatePaymentMethod(data.id, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['payment-methods']);
      toast.success('Payment method updated');
    },
    onError: () => {
      toast.error('Failed to update payment method');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => walletApi.deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['payment-methods']);
      toast.success('Payment method deleted');
    },
    onError: () => {
      toast.error('Failed to delete payment method');
    },
  });

  const getMethodIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'CARD':
        return <CreditCard className="h-5 w-5" />;
      case 'BANK':
        return <Bank className="h-5 w-5" />;
      case 'WALLET':
        return <Wallet className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: PaymentMethod['status']) => {
    const variants = {
      ACTIVE: { variant: 'success', icon: CheckCircle },
      INACTIVE: { variant: 'secondary', icon: AlertTriangle },
      EXPIRED: { variant: 'destructive', icon: AlertTriangle },
    };

    const { variant, icon: Icon } = variants[status];

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.toLowerCase()}
      </Badge>
    );
  };

  if (isLoading) {
    return <div>Loading payment methods...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Payment Methods</h3>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span>Add Method</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {methods?.map((method: PaymentMethod) => (
          <Card key={method.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {getMethodIcon(method.type)}
                </div>
                <div>
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {method.type === 'CARD'
                      ? `${method.details.brand} •••• ${method.details.last4}`
                      : method.type === 'BANK'
                      ? `${method.details.bankName} - ${method.details.accountType}`
                      : 'Digital Wallet'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this payment method?'
                      )
                    ) {
                      deleteMutation.mutate(method.id);
                    }
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(method.status)}
              </div>

              {method.expiryDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Expires
                  </span>
                  <span className="text-sm">{method.expiryDate}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Default Method
                </span>
                <Switch
                  checked={method.isDefault}
                  onCheckedChange={(checked) =>
                    updateMutation.mutate({
                      id: method.id,
                      updates: { isDefault: checked },
                    })
                  }
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedMethod}
        onClose={() => setSelectedMethod(null)}
        title="Edit Payment Method"
      >
        {selectedMethod && (
          <PaymentMethodForm
            methodId={selectedMethod}
            onSubmit={async (data) => {
              await updateMutation.mutateAsync({
                id: selectedMethod,
                updates: data,
              });
              setSelectedMethod(null);
            }}
          />
        )}
      </Dialog>

      <Dialog
        open={isAddingNew}
        onClose={() => setIsAddingNew(false)}
        title="Add Payment Method"
      >
        <PaymentMethodForm
          onSubmit={async (data) => {
            await walletApi.addPaymentMethod(data);
            queryClient.invalidateQueries(['payment-methods']);
            setIsAddingNew(false);
            toast.success('Payment method added');
          }}
        />
      </Dialog>
    </div>
  );
}

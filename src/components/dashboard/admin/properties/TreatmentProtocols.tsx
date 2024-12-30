import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import {
  Bug,
  Thermometer,
  Droplet,
  Shield,
  AlertTriangle,
  FileText,
  Plus,
  Edit,
  Trash,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { propertyApi } from '@/lib/api/property';

const PEST_CATEGORIES = [
  {
    id: 'ants',
    name: 'Ants',
    variants: ['Carpenter', 'Fire', 'Sugar', 'Pavement'],
    treatments: ['Baiting', 'Spraying', 'Gel'],
  },
  {
    id: 'roaches',
    name: 'Cockroaches',
    variants: ['German', 'American', 'Oriental'],
    treatments: ['Baiting', 'Spraying', 'Gel', 'IGR'],
  },
  {
    id: 'termites',
    name: 'Termites',
    variants: ['Subterranean', 'Drywood', 'Formosan'],
    treatments: ['Liquid Barrier', 'Bait Stations', 'Fumigation'],
  },
  {
    id: 'rodents',
    name: 'Rodents',
    variants: ['Mice', 'Rats', 'Squirrels'],
    treatments: ['Trapping', 'Baiting', 'Exclusion'],
  },
  {
    id: 'mosquitoes',
    name: 'Mosquitoes',
    variants: ['Asian Tiger', 'Common House'],
    treatments: ['Fogging', 'Larvicide', 'Barrier Spray'],
  },
];

export function TreatmentProtocols() {
  const queryClient = useQueryClient();
  const [selectedPest, setSelectedPest] = React.useState('');
  const [isAddingProtocol, setIsAddingProtocol] = React.useState(false);
  const [editingProtocol, setEditingProtocol] = React.useState<string | null>(null);

  const { data: protocols, isLoading } = useQuery({
    queryKey: ['treatment-protocols', selectedPest],
    queryFn: () => propertyApi.getTreatmentProtocols(selectedPest),
  });

  const addProtocolMutation = useMutation({
    mutationFn: (data: any) => propertyApi.addTreatmentProtocol(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['treatment-protocols']);
      toast.success('Protocol added successfully');
      setIsAddingProtocol(false);
    },
    onError: () => {
      toast.error('Failed to add protocol');
    },
  });

  const updateProtocolMutation = useMutation({
    mutationFn: (data: any) => propertyApi.updateTreatmentProtocol(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['treatment-protocols']);
      toast.success('Protocol updated successfully');
      setEditingProtocol(null);
    },
    onError: () => {
      toast.error('Failed to update protocol');
    },
  });

  const deleteProtocolMutation = useMutation({
    mutationFn: (id: string) => propertyApi.deleteTreatmentProtocol(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['treatment-protocols']);
      toast.success('Protocol deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete protocol');
    },
  });

  const renderProtocolForm = (protocol?: any) => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Pest Type</label>
          <Select
            value={protocol?.pestType || selectedPest}
            onValueChange={setSelectedPest}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pest type" />
            </SelectTrigger>
            <SelectContent>
              {PEST_CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Variant</label>
          <Select
            value={protocol?.variant || ''}
            onValueChange={(value) => {
              // Handle variant selection
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              {PEST_CATEGORIES.find((c) => c.id === selectedPest)?.variants.map(
                (variant) => (
                  <SelectItem key={variant} value={variant}>
                    {variant}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Treatment Method</label>
          <Select
            value={protocol?.treatmentMethod || ''}
            onValueChange={(value) => {
              // Handle treatment method selection
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select treatment" />
            </SelectTrigger>
            <SelectContent>
              {PEST_CATEGORIES.find((c) => c.id === selectedPest)?.treatments.map(
                (treatment) => (
                  <SelectItem key={treatment} value={treatment}>
                    {treatment}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Severity Level</label>
          <Select
            value={protocol?.severityLevel || ''}
            onValueChange={(value) => {
              // Handle severity selection
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Treatment Steps</label>
        <Textarea
          placeholder="Enter detailed treatment steps..."
          value={protocol?.steps || ''}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Safety Precautions</label>
        <Textarea
          placeholder="Enter safety precautions..."
          value={protocol?.safety || ''}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Required Products</label>
        <div className="space-y-2">
          {protocol?.products?.map((product: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={product.name}
                placeholder="Product name"
                className="flex-1"
              />
              <Input
                value={product.quantity}
                placeholder="Quantity"
                type="number"
                className="w-24"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  // Handle product removal
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Handle adding new product
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Treatment Protocols</h2>
        <Button
          onClick={() => setIsAddingProtocol(true)}
          className="flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span>Add Protocol</span>
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Select
              value={selectedPest}
              onValueChange={setSelectedPest}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pest type" />
              </SelectTrigger>
              <SelectContent>
                {PEST_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {protocols?.map((protocol: any) => (
        <Card key={protocol.id} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bug className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{protocol.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {protocol.variant} - {protocol.treatmentMethod}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingProtocol(protocol.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this protocol?'
                    )
                  ) {
                    deleteProtocolMutation.mutate(protocol.id);
                  }
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium mb-2">Treatment Steps</h4>
              <div className="space-y-2">
                {protocol.steps.map((step: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 text-sm"
                  >
                    <div className="p-1 rounded-full bg-primary/10">
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Safety Precautions</h4>
                <div className="space-y-2">
                  {protocol.safety.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Required Products</h4>
                <div className="space-y-2">
                  {protocol.products.map((product: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{product.name}</span>
                      <Badge variant="secondary">{product.quantity}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Dialog
        open={isAddingProtocol}
        onClose={() => setIsAddingProtocol(false)}
      >
        <DialogHeader>
          <DialogTitle>Add Treatment Protocol</DialogTitle>
        </DialogHeader>
        <DialogContent>
          {renderProtocolForm()}
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsAddingProtocol(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle protocol submission
              }}
            >
              Add Protocol
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editingProtocol}
        onClose={() => setEditingProtocol(null)}
      >
        <DialogHeader>
          <DialogTitle>Edit Treatment Protocol</DialogTitle>
        </DialogHeader>
        <DialogContent>
          {editingProtocol &&
            renderProtocolForm(
              protocols?.find((p: any) => p.id === editingProtocol)
            )}
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setEditingProtocol(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle protocol update
              }}
            >
              Update Protocol
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import {
  User,
  Phone,
  Mail,
  Home,
  Calendar,
  CreditCard,
  FileText,
  Edit,
  Star,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { propertyApi } from '@/lib/api/property';
import { Dialog } from '@/components/ui/Dialog';

interface ClientDetailsProps {
  propertyId: string;
}

export function ClientDetails({ propertyId }: ClientDetailsProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = React.useState(false);
  const [showNotes, setShowNotes] = React.useState(false);

  const { data: client, isLoading } = useQuery({
    queryKey: ['client-details', propertyId],
    queryFn: () => propertyApi.getClientDetails(propertyId),
  });

  const updateClientMutation = useMutation({
    mutationFn: (data: any) => propertyApi.updateClientDetails(propertyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['client-details', propertyId]);
      toast.success('Client details updated successfully');
      setIsEditing(false);
    },
    onError: () => {
      toast.error('Failed to update client details');
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: (note: string) => propertyApi.addClientNote(propertyId, note),
    onSuccess: () => {
      queryClient.invalidateQueries(['client-details', propertyId]);
      toast.success('Note added successfully');
      setShowNotes(false);
    },
    onError: () => {
      toast.error('Failed to add note');
    },
  });

  if (isLoading) {
    return <div>Loading client details...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{client.name}</h2>
            <p className="text-sm text-muted-foreground">
              Client since {format(new Date(client.joinDate), 'MMMM yyyy')}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-1"
        >
          <Edit className="h-4 w-4" />
          <span>Edit Details</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p>{client.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{client.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Home className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p>{client.address}</p>
                <p>{client.city}, {client.state} {client.zip}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Service Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Preferred Service Day</p>
                <p>{client.preferredServiceDay || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p>{client.paymentMethod}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Special Instructions</p>
                <p>{client.specialInstructions || 'None'}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Service History</h3>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>{client.totalServices} Services</span>
            </Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {client.serviceHistory.map((service: any) => (
                <TableRow key={service.id}>
                  <TableCell>
                    {format(new Date(service.date), 'PP')}
                  </TableCell>
                  <TableCell>{service.type}</TableCell>
                  <TableCell>{service.technician}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        service.status === 'Completed'
                          ? 'success'
                          : service.status === 'Scheduled'
                          ? 'warning'
                          : 'destructive'
                      }
                    >
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {service.feedback ? (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{service.feedback}</span>
                      </div>
                    ) : (
                      'No feedback'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Notes & Communication</h3>
            <Button
              variant="outline"
              onClick={() => setShowNotes(true)}
              className="flex items-center space-x-1"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Add Note</span>
            </Button>
          </div>
          <div className="space-y-4">
            {client.notes.map((note: any) => (
              <div
                key={note.id}
                className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50"
              >
                <FileText className="h-4 w-4 mt-1" />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">{note.author}</p>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(note.timestamp), 'PPp')}
                    </span>
                  </div>
                  <p className="mt-1">{note.content}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Client Details"
      >
        <Form
          onSubmit={(data) => updateClientMutation.mutate(data)}
          defaultValues={client}
        >
          {/* Form fields for editing client details */}
        </Form>
      </Dialog>

      <Dialog
        open={showNotes}
        onClose={() => setShowNotes(false)}
        title="Add Note"
      >
        <div className="space-y-4">
          <Textarea
            placeholder="Enter your note..."
            rows={4}
            onChange={(e) => addNoteMutation.mutate(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowNotes(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Note</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

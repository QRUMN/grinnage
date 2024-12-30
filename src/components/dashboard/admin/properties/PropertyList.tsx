import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  Building2,
  Home,
  MoreHorizontal,
  Calendar,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  History,
  Bug,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { propertyApi } from '@/lib/api/property';
import { Dialog } from '@/components/ui/Dialog';
import { PropertyDetails } from './PropertyDetails';
import { EditPropertyForm } from './EditPropertyForm';
import { ServiceHistory } from './ServiceHistory';

interface PropertyListProps {
  type: 'all' | 'residential' | 'commercial';
  filters: {
    type: string;
    status: string;
    search: string;
    serviceDate: Date | null;
  };
}

export function PropertyList({ type, filters }: PropertyListProps) {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [selectedProperty, setSelectedProperty] = React.useState<string | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showServiceHistory, setShowServiceHistory] = React.useState(false);
  const ITEMS_PER_PAGE = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['properties', type, page, filters],
    queryFn: () =>
      propertyApi.getProperties({
        type,
        page,
        limit: ITEMS_PER_PAGE,
        ...filters,
      }),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (data: { id: string; active: boolean }) =>
      propertyApi.updatePropertyStatus(data.id, data.active),
    onSuccess: () => {
      queryClient.invalidateQueries(['properties']);
      toast.success('Property status updated');
    },
    onError: () => {
      toast.error('Failed to update property status');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => propertyApi.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['properties']);
      toast.success('Property deleted');
    },
    onError: () => {
      toast.error('Failed to delete property');
    },
  });

  const getPropertyIcon = (propertyType: string) => {
    return propertyType === 'residential' ? (
      <Home className="h-4 w-4" />
    ) : (
      <Building2 className="h-4 w-4" />
    );
  };

  const getStatusBadge = (active: boolean) => {
    return active ? (
      <Badge variant="success" className="flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="flex items-center gap-1">
        <XCircle className="h-3 w-3" />
        Inactive
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Service</TableHead>
            <TableHead>Next Service</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getPropertyIcon(property.type)}
                  <div>
                    <div className="font-medium">{property.address}</div>
                    <div className="text-sm text-muted-foreground">
                      {property.city}, {property.state} {property.zip}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{property.clientName}</div>
                  <div className="text-sm text-muted-foreground">
                    {property.clientPhone}
                  </div>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(property.active)}</TableCell>
              <TableCell>
                {property.lastService ? (
                  <div>
                    <div>{format(new Date(property.lastService), 'PP')}</div>
                    <div className="text-sm text-muted-foreground">
                      {property.lastServiceType}
                    </div>
                  </div>
                ) : (
                  'No service yet'
                )}
              </TableCell>
              <TableCell>
                {property.nextService && (
                  <div>
                    <div>{format(new Date(property.nextService), 'PP')}</div>
                    <div className="text-sm text-muted-foreground">
                      {property.nextServiceType}
                    </div>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => setSelectedProperty(property.id)}
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Property
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowServiceHistory(true)}
                    >
                      <History className="mr-2 h-4 w-4" />
                      Service History
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        toggleStatusMutation.mutate({
                          id: property.id,
                          active: !property.active,
                        })
                      }
                    >
                      {property.active ? (
                        <>
                          <XCircle className="mr-2 h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you want to delete this property?'
                          )
                        ) {
                          deleteMutation.mutate(property.id);
                        }
                      }}
                      className="text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data?.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {page} of {data.totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === data.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <Dialog
        open={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        title="Property Details"
      >
        {selectedProperty && (
          <PropertyDetails propertyId={selectedProperty} />
        )}
      </Dialog>

      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Property"
      >
        {selectedProperty && (
          <EditPropertyForm
            propertyId={selectedProperty}
            onSubmit={async (data) => {
              await propertyApi.updateProperty(selectedProperty, data);
              setIsEditing(false);
              queryClient.invalidateQueries(['properties']);
              toast.success('Property updated');
            }}
          />
        )}
      </Dialog>

      <Dialog
        open={showServiceHistory}
        onClose={() => setShowServiceHistory(false)}
        title="Service History"
      >
        {selectedProperty && (
          <ServiceHistory propertyId={selectedProperty} />
        )}
      </Dialog>
    </>
  );
}

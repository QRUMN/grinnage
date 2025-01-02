import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Property } from '@/types/property';
import { formatDate } from '@/lib/utils';

interface PropertyDetailsProps {
  property: Property;
  onEdit: () => void;
  onViewServiceHistory: () => void;
}

export function PropertyDetails({ property, onEdit, onViewServiceHistory }: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Property Name</h3>
              <p className="mt-1">{property.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <Badge variant={property.status === 'active' ? 'success' : 'warning'} className="mt-1">
                {property.status}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="mt-1">{property.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Property Type</h3>
              <p className="mt-1">{property.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Size</h3>
              <p className="mt-1">{property.size} sq ft</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Last Service Date</h3>
              <p className="mt-1">{property.lastServiceDate ? formatDate(property.lastServiceDate) : 'No service history'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Client Name</h3>
              <p className="mt-1">{property.clientName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Client Email</h3>
              <p className="mt-1">{property.clientEmail}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Client Phone</h3>
              <p className="mt-1">{property.clientPhone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {property.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{property.notes}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex space-x-4">
        <Button onClick={onEdit}>Edit Property</Button>
        <Button variant="outline" onClick={onViewServiceHistory}>
          View Service History
        </Button>
      </div>
    </div>
  );
}

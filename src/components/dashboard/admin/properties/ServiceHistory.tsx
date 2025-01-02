import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ServiceRecord } from '@/types/property';
import { formatDate, formatTime } from '@/lib/utils';

interface ServiceHistoryProps {
  propertyId: string;
  serviceRecords: ServiceRecord[];
  onAddService: () => void;
  onViewDetails: (recordId: string) => void;
}

export function ServiceHistory({
  propertyId,
  serviceRecords,
  onAddService,
  onViewDetails,
}: ServiceHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Service History</h2>
        <Button onClick={onAddService}>Add Service Record</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatDate(record.date)}</div>
                      <div className="text-sm text-gray-500">{formatTime(record.date)}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.technician}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === 'completed'
                          ? 'success'
                          : record.status === 'scheduled'
                          ? 'default'
                          : 'warning'
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => onViewDetails(record.id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {serviceRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No service records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

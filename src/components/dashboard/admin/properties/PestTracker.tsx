import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Bug,
  AlertTriangle,
  CheckCircle,
  Plus,
  Camera,
  MapPin,
  FileText,
  Thermometer,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { propertyApi } from '@/lib/api/property';
import { Dialog } from '@/components/ui/Dialog';
import { ImageUpload } from '@/components/shared/ImageUpload';

interface PestTrackerProps {
  propertyId: string;
}

const PEST_TYPES = [
  { id: 'ants', name: 'Ants', severity: ['low', 'medium', 'high'] },
  { id: 'roaches', name: 'Cockroaches', severity: ['low', 'medium', 'high'] },
  { id: 'termites', name: 'Termites', severity: ['low', 'medium', 'high'] },
  { id: 'rodents', name: 'Rodents', severity: ['low', 'medium', 'high'] },
  { id: 'bedbugs', name: 'Bed Bugs', severity: ['low', 'medium', 'high'] },
  { id: 'mosquitoes', name: 'Mosquitoes', severity: ['low', 'medium', 'high'] },
  { id: 'wasps', name: 'Wasps/Hornets', severity: ['low', 'medium', 'high'] },
  { id: 'spiders', name: 'Spiders', severity: ['low', 'medium', 'high'] },
];

const TREATMENT_METHODS = [
  'Baiting',
  'Spraying',
  'Fumigation',
  'Heat Treatment',
  'Trapping',
  'Exclusion',
  'Natural/Organic',
];

export function PestTracker({ propertyId }: PestTrackerProps) {
  const queryClient = useQueryClient();
  const [isAddingRecord, setIsAddingRecord] = React.useState(false);
  const [selectedPest, setSelectedPest] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [treatmentMethod, setTreatmentMethod] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [images, setImages] = React.useState<string[]>([]);

  const { data: pestHistory, isLoading } = useQuery({
    queryKey: ['pest-history', propertyId],
    queryFn: () => propertyApi.getPestHistory(propertyId),
  });

  const addRecordMutation = useMutation({
    mutationFn: (data: any) => propertyApi.addPestRecord(propertyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['pest-history', propertyId]);
      toast.success('Pest record added successfully');
      setIsAddingRecord(false);
      resetForm();
    },
    onError: () => {
      toast.error('Failed to add pest record');
    },
  });

  const resetForm = () => {
    setSelectedPest('');
    setSeverity('');
    setLocation('');
    setTreatmentMethod('');
    setNotes('');
    setImages([]);
  };

  const handleSubmit = () => {
    if (!selectedPest || !severity || !location || !treatmentMethod) {
      toast.error('Please fill in all required fields');
      return;
    }

    const recordData = {
      pestType: selectedPest,
      severity,
      location,
      treatmentMethod,
      notes,
      images,
      timestamp: new Date().toISOString(),
    };

    addRecordMutation.mutate(recordData);
  };

  const getSeverityBadge = (level: string) => {
    const variants: Record<string, { color: string; icon: React.ReactNode }> = {
      low: { color: 'success', icon: <CheckCircle className="h-3 w-3" /> },
      medium: { color: 'warning', icon: <AlertTriangle className="h-3 w-3" /> },
      high: { color: 'destructive', icon: <AlertTriangle className="h-3 w-3" /> },
    };

    const { color, icon } = variants[level] || variants.medium;

    return (
      <Badge variant={color} className="flex items-center gap-1">
        {icon}
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Pest Tracking</h3>
        <Button
          onClick={() => setIsAddingRecord(true)}
          className="flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span>Add Record</span>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Pest Type</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Treatment</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pestHistory?.records.map((record: any) => (
            <TableRow key={record.id}>
              <TableCell>
                {format(new Date(record.timestamp), 'PPp')}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Bug className="h-4 w-4" />
                  <span>{record.pestType}</span>
                </div>
              </TableCell>
              <TableCell>{getSeverityBadge(record.severity)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{record.location}</span>
                </div>
              </TableCell>
              <TableCell>{record.treatmentMethod}</TableCell>
              <TableCell>
                <Badge
                  variant={record.resolved ? 'success' : 'warning'}
                  className="flex items-center gap-1"
                >
                  {record.resolved ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <AlertTriangle className="h-3 w-3" />
                  )}
                  {record.resolved ? 'Resolved' : 'Ongoing'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={isAddingRecord}
        onClose={() => setIsAddingRecord(false)}
        title="Add Pest Record"
      >
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pest Type</label>
              <Select
                value={selectedPest}
                onValueChange={setSelectedPest}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pest type" />
                </SelectTrigger>
                <SelectContent>
                  {PEST_TYPES.map((pest) => (
                    <SelectItem key={pest.id} value={pest.id}>
                      <div className="flex items-center">
                        <Bug className="mr-2 h-4 w-4" />
                        {pest.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <Select
                value={severity}
                onValueChange={setSeverity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {selectedPest &&
                    PEST_TYPES
                      .find((p) => p.id === selectedPest)
                      ?.severity.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="e.g., Kitchen, Basement"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Treatment Method</label>
              <Select
                value={treatmentMethod}
                onValueChange={setTreatmentMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select treatment" />
                </SelectTrigger>
                <SelectContent>
                  {TREATMENT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              placeholder="Add any observations or special notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Images</label>
            <ImageUpload
              value={images}
              onChange={setImages}
              maxFiles={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsAddingRecord(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Record
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

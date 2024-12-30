import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs';
import {
  Building2,
  Home,
  Plus,
  Calendar,
  Users,
  Activity,
  Download,
} from 'lucide-react';
import { PropertyList } from './PropertyList';
import { PropertyFilters } from './PropertyFilters';
import { PropertyStats } from './PropertyStats';
import { propertyApi } from '@/lib/api/property';
import { Dialog } from '@/components/ui/Dialog';
import { AddPropertyForm } from './AddPropertyForm';

export function PropertyDashboard() {
  const [isAddingProperty, setIsAddingProperty] = React.useState(false);
  const [filters, setFilters] = React.useState({
    type: 'all',
    status: 'all',
    search: '',
    serviceDate: null,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['property-stats'],
    queryFn: () => propertyApi.getPropertyStats(),
  });

  const quickStats = [
    {
      title: 'Total Properties',
      value: stats?.totalProperties || 0,
      icon: <Building2 className="h-4 w-4" />,
      change: stats?.propertyChange,
    },
    {
      title: 'Active Residential',
      value: stats?.activeResidential || 0,
      icon: <Home className="h-4 w-4" />,
      change: stats?.residentialChange,
    },
    {
      title: 'Active Commercial',
      value: stats?.activeCommercial || 0,
      icon: <Building2 className="h-4 w-4" />,
      change: stats?.commercialChange,
    },
    {
      title: 'Upcoming Services',
      value: stats?.upcomingServices || 0,
      icon: <Calendar className="h-4 w-4" />,
      change: stats?.servicesChange,
    },
  ];

  const handleExport = async () => {
    try {
      const response = await propertyApi.exportProperties(filters);
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `properties-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export properties:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Property Management</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center space-x-1"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button
            onClick={() => setIsAddingProperty(true)}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-lg">
                {stat.icon}
              </div>
              {stat.change !== undefined && (
                <div
                  className={`text-sm ${
                    stat.change > 0
                      ? 'text-green-600'
                      : stat.change < 0
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {stat.change > 0 ? '+' : ''}
                  {stat.change}%
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <PropertyFilters filters={filters} onFilterChange={setFilters} />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center space-x-1">
            <Building2 className="h-4 w-4" />
            <span>All Properties</span>
          </TabsTrigger>
          <TabsTrigger
            value="residential"
            className="flex items-center space-x-1"
          >
            <Home className="h-4 w-4" />
            <span>Residential</span>
          </TabsTrigger>
          <TabsTrigger
            value="commercial"
            className="flex items-center space-x-1"
          >
            <Building2 className="h-4 w-4" />
            <span>Commercial</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-1">
            <Activity className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <PropertyList type="all" filters={filters} />
        </TabsContent>

        <TabsContent value="residential">
          <PropertyList type="residential" filters={filters} />
        </TabsContent>

        <TabsContent value="commercial">
          <PropertyList type="commercial" filters={filters} />
        </TabsContent>

        <TabsContent value="analytics">
          <PropertyStats filters={filters} />
        </TabsContent>
      </Tabs>

      <Dialog
        open={isAddingProperty}
        onClose={() => setIsAddingProperty(false)}
        title="Add New Property"
      >
        <AddPropertyForm
          onSubmit={async (data) => {
            await propertyApi.addProperty(data);
            setIsAddingProperty(false);
          }}
        />
      </Dialog>
    </div>
  );
}

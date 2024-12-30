import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
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
  Package,
  AlertTriangle,
  Plus,
  FileText,
  RefreshCcw,
  Truck,
  DollarSign,
  BarChart,
  Calendar,
  Search,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { propertyApi } from '@/lib/api/property';

const PRODUCT_CATEGORIES = [
  'Pesticides',
  'Baits',
  'Traps',
  'Equipment',
  'Safety Gear',
  'Tools',
];

const SUPPLIERS = [
  'PestPro Supply Co.',
  'SafeGuard Products',
  'EcoPest Solutions',
  'BioControl Systems',
];

interface Product {
  id: string;
  name: string;
  category: string;
  supplier: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  price: number;
  lastRestocked: string;
  expiryDate?: string;
  location: string;
}

export function InventoryManagement() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [isRestocking, setIsRestocking] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null);

  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory', searchQuery, selectedCategory],
    queryFn: () =>
      propertyApi.getInventory({ search: searchQuery, category: selectedCategory }),
  });

  const addProductMutation = useMutation({
    mutationFn: (data: Partial<Product>) => propertyApi.addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['inventory']);
      toast.success('Product added successfully');
      setIsAddingProduct(false);
    },
    onError: () => {
      toast.error('Failed to add product');
    },
  });

  const restockMutation = useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      propertyApi.restockProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['inventory']);
      toast.success('Product restocked successfully');
      setIsRestocking(false);
    },
    onError: () => {
      toast.error('Failed to restock product');
    },
  });

  const getLowStockProducts = () => {
    return inventory?.filter((product: Product) => product.quantity <= product.minQuantity);
  };

  const getExpiringProducts = () => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return inventory?.filter((product: Product) => {
      if (!product.expiryDate) return false;
      const expiryDate = new Date(product.expiryDate);
      return expiryDate <= thirtyDaysFromNow;
    });
  };

  const renderInventoryMetrics = () => (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-primary/10">
            <Package className="h-4 w-4" />
          </div>
          <Badge variant="secondary">Total Products</Badge>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{inventory?.length || 0}</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </div>
          <Badge variant="warning">Low Stock</Badge>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{getLowStockProducts()?.length || 0}</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-green-500/10">
            <DollarSign className="h-4 w-4 text-green-500" />
          </div>
          <Badge variant="success">Total Value</Badge>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">
            ${inventory?.reduce((acc: number, product: Product) => 
              acc + (product.price * product.quantity), 0).toFixed(2) || '0.00'}
          </p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-red-500/10">
            <Calendar className="h-4 w-4 text-red-500" />
          </div>
          <Badge variant="destructive">Expiring Soon</Badge>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{getExpiringProducts()?.length || 0}</p>
        </div>
      </Card>
    </div>
  );

  const renderProductForm = (product?: Partial<Product>) => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name</label>
          <Input
            placeholder="Enter product name"
            value={product?.name || ''}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            value={product?.category || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Supplier</label>
          <Select
            value={product?.supplier || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              {SUPPLIERS.map((supplier) => (
                <SelectItem key={supplier} value={supplier}>
                  {supplier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Initial Quantity</label>
          <Input
            type="number"
            placeholder="Enter quantity"
            value={product?.quantity || ''}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Unit</label>
          <Input
            placeholder="e.g., bottles, boxes"
            value={product?.unit || ''}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Minimum Quantity</label>
          <Input
            type="number"
            placeholder="Enter minimum quantity"
            value={product?.minQuantity || ''}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price per Unit</label>
          <Input
            type="number"
            step="0.01"
            placeholder="Enter price"
            value={product?.price || ''}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Storage Location</label>
          <Input
            placeholder="Enter storage location"
            value={product?.location || ''}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Expiry Date</label>
          <Input
            type="date"
            value={product?.expiryDate?.split('T')[0] || ''}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              // Handle export
            }}
            className="flex items-center space-x-1"
          >
            <FileText className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button
            onClick={() => setIsAddingProduct(true)}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>

      {renderInventoryMetrics()}

      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Restocked</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory?.map((product: Product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.supplier}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>{product.quantity}</span>
                    <span className="text-sm text-muted-foreground">
                      {product.unit}
                    </span>
                  </div>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.quantity <= product.minQuantity ? (
                    <Badge variant="destructive">Low Stock</Badge>
                  ) : (
                    <Badge variant="success">In Stock</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(product.lastRestocked), 'PP')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setIsRestocking(true);
                      }}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setIsAddingProduct(true);
                      }}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog
        open={isAddingProduct}
        onClose={() => {
          setIsAddingProduct(false);
          setSelectedProduct(null);
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {selectedProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <DialogContent>
          {renderProductForm(
            selectedProduct
              ? inventory?.find((p: Product) => p.id === selectedProduct)
              : undefined
          )}
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddingProduct(false);
                setSelectedProduct(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle product submission
              }}
            >
              {selectedProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isRestocking}
        onClose={() => {
          setIsRestocking(false);
          setSelectedProduct(null);
        }}
      >
        <DialogHeader>
          <DialogTitle>Restock Product</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity to Add</label>
              <Input type="number" placeholder="Enter quantity" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsRestocking(false);
                  setSelectedProduct(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle restock submission
                }}
              >
                Restock
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

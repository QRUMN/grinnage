import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
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
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  Eye,
  FileText,
  Ban,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { walletApi } from '@/lib/api/wallet';
import { formatCurrency } from '@/lib/utils';
import { Dialog } from '@/components/ui/Dialog';
import { TransactionDetails } from './TransactionDetails';

interface TransactionHistoryProps {
  filters: {
    dateRange: {
      from: Date | null;
      to: Date | null;
    };
    type: string;
    status: string;
    minAmount: string;
    maxAmount: string;
  };
}

export function TransactionHistory({ filters }: TransactionHistoryProps) {
  const [page, setPage] = React.useState(1);
  const [selectedTransaction, setSelectedTransaction] = React.useState<string | null>(null);
  const ITEMS_PER_PAGE = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['transactions', page, filters],
    queryFn: () =>
      walletApi.getTransactions({
        page,
        limit: ITEMS_PER_PAGE,
        ...filters,
      }),
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: string; icon: React.ReactNode }> = {
      COMPLETED: { variant: 'success', icon: <CheckCircle className="h-3 w-3" /> },
      PENDING: { variant: 'warning', icon: <AlertTriangle className="h-3 w-3" /> },
      FAILED: { variant: 'destructive', icon: <Ban className="h-3 w-3" /> },
    };

    const { variant, icon } = variants[status] || variants.PENDING;

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {icon}
        {status.toLowerCase()}
      </Badge>
    );
  };

  const getTransactionIcon = (type: string) => {
    return type === 'CREDIT' ? (
      <ArrowDownLeft className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-red-500" />
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
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-mono text-sm">
                {transaction.id.slice(0, 8)}...
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getTransactionIcon(transaction.type)}
                  <span>{transaction.type}</span>
                </div>
              </TableCell>
              <TableCell
                className={
                  transaction.type === 'CREDIT'
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {transaction.type === 'CREDIT' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              <TableCell>
                {format(new Date(transaction.timestamp), 'PPp')}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {transaction.description}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => setSelectedTransaction(transaction.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        // Download receipt
                        walletApi.downloadReceipt(transaction.id);
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download Receipt
                    </DropdownMenuItem>
                    {transaction.status === 'PENDING' && (
                      <>
                        <DropdownMenuItem
                          onClick={() => {
                            // Approve transaction
                            walletApi.approveTransaction(transaction.id);
                          }}
                          className="text-green-600"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            // Reject transaction
                            walletApi.rejectTransaction(transaction.id);
                          }}
                          className="text-red-600"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}
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
        open={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <TransactionDetails transactionId={selectedTransaction} />
        )}
      </Dialog>
    </>
  );
}

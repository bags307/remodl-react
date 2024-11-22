import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, DollarSign, TrendingUp, CreditCard, Users } from 'lucide-react';

interface BillingOverview {
  mrr: number;
  arr: number;
  activeSubscriptions: number;
  trialSubscriptions: number;
}

interface Transaction {
  id: string;
  organizationName: string;
  amount: number;
  status: 'succeeded' | 'failed' | 'pending';
  date: Date;
  type: 'subscription' | 'one-time';
}

const mockBillingOverview: BillingOverview = {
  mrr: 45280,
  arr: 543360,
  activeSubscriptions: 156,
  trialSubscriptions: 23,
};

const mockTransactions: Transaction[] = Array(10).fill(null).map((_, i) => ({
  id: `tx-${i}`,
  organizationName: `Organization ${i + 1}`,
  amount: Math.floor(Math.random() * 1000) * 100,
  status: ['succeeded', 'failed', 'pending'][Math.floor(Math.random() * 3)] as Transaction['status'],
  date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
  type: ['subscription', 'one-time'][Math.floor(Math.random() * 2)] as Transaction['type'],
}));

export function AdminBilling() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Recurring Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockBillingOverview.mrr.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Annual Recurring Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockBillingOverview.arr.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBillingOverview.activeSubscriptions}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Trial Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBillingOverview.trialSubscriptions}
            </div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <p className="text-sm text-muted-foreground">
              View and manage payment transactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.organizationName}
                  </TableCell>
                  <TableCell>
                    ${transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="capitalize">
                    {transaction.type}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === 'succeeded'
                          ? 'default'
                          : transaction.status === 'failed'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {transaction.date.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
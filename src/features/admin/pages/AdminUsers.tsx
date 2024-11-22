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
import { Search, Plus } from 'lucide-react';
import type { AdminUser } from '../types';

const mockUsers: AdminUser[] = Array(10).fill(null).map((_, i) => ({
  id: `user-${i}`,
  email: `user${i + 1}@example.com`,
  name: `User ${i + 1}`,
  role: ['super_admin', 'admin', 'support'][Math.floor(Math.random() * 3)] as AdminUser['role'],
  status: ['active', 'inactive'][Math.floor(Math.random() * 2)] as AdminUser['status'],
  lastLogin: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
  createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
}));

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.lastLogin.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {user.createdAt.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
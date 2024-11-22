import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Organization } from '@/types/organization';
import { formatDate } from '@/lib/utils';

interface OrganizationListProps {
  organizations: Organization[];
  onAddOrganization: () => void;
  onEditOrganization: (org: Organization) => void;
}

export function OrganizationList({
  organizations,
  onAddOrganization,
  onEditOrganization,
}: OrganizationListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Button onClick={onAddOrganization}>
          <Plus className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Domains</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrganizations.map((org) => (
              <TableRow 
                key={org.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onEditOrganization(org)}
              >
                <TableCell>
                  <div>
                    <div className="font-medium">{org.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {org.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {org.userCount} / {org.maxUserCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {org.domains.map((domain, index) => (
                      <Badge key={index} variant="outline">
                        {domain}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        org.orgCheck && org.codeCheck && org.profileCheck
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {org.orgCheck && org.codeCheck && org.profileCheck
                        ? 'Active'
                        : 'Pending'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{formatDate(org.createdAt.toDate())}</TableCell>
                <TableCell>{formatDate(org.updatedAt.toDate())}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
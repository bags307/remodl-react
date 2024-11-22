import { Property } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Phone, Mail } from 'lucide-react';

interface PropertyVendorsProps {
  property: Property;
}

interface Vendor {
  id: string;
  name: string;
  type: string[];
  contact: {
    email: string;
    phone: string;
  };
  status: 'active' | 'inactive';
}

// Mock vendor data
const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'ABC Plumbing',
    type: ['Plumbing', 'HVAC'],
    contact: {
      email: 'contact@abcplumbing.com',
      phone: '(555) 123-4567',
    },
    status: 'active',
  },
  {
    id: '2',
    name: 'XYZ Electric',
    type: ['Electrical'],
    contact: {
      email: 'info@xyzelectric.com',
      phone: '(555) 987-6543',
    },
    status: 'active',
  },
  {
    id: '3',
    name: 'Quality Painters',
    type: ['Painting', 'Drywall'],
    contact: {
      email: 'jobs@qualitypainters.com',
      phone: '(555) 456-7890',
    },
    status: 'inactive',
  },
];

export function PropertyVendors({ property }: PropertyVendorsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Assigned Vendors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="space-y-3 pb-4 last:pb-0 border-b last:border-0"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{vendor.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vendor.type.map((type) => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge
                  variant={vendor.status === 'active' ? 'default' : 'secondary'}
                >
                  {vendor.status}
                </Badge>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {vendor.contact.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {vendor.contact.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
import { Property } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Ruler, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PropertyOverviewProps {
  property: Property;
}

export function PropertyOverview({ property }: PropertyOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Property Overview</CardTitle>
          <Badge
            variant={
              property.status === 'active'
                ? 'default'
                : property.status === 'pending'
                ? 'secondary'
                : 'outline'
            }
          >
            {property.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="h-4 w-4 mt-1" />
            <div>
              <div className="font-medium">Property Type</div>
              <div className="text-sm text-muted-foreground">
                {property.data.summary.propertyType}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Ruler className="h-4 w-4 mt-1" />
            <div>
              <div className="font-medium">Size</div>
              <div className="text-sm text-muted-foreground">
                {property.data.building.size.livingSize.toLocaleString()} sqft
                <br />
                {property.data.building.rooms.beds} bed • {property.data.building.rooms.bathsFull} bath
                <br />
                {property.data.building.rooms.roomsTotal} total rooms
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 mt-1" />
            <div>
              <div className="font-medium">Year Built</div>
              <div className="text-sm text-muted-foreground">
                {property.data.summary.yearBuilt}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DollarSign className="h-4 w-4 mt-1" />
            <div>
              <div className="font-medium">Assessment</div>
              <div className="text-sm text-muted-foreground">
                Market Value: {formatCurrency(property.data.assessment.market.mktTtlValue)}
                <br />
                Tax Assessment: {formatCurrency(property.data.assessment.assessed.assdTtlValue)}
                <br />
                Annual Tax: {formatCurrency(property.data.assessment.tax.taxAmt)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { Property } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();

  return (
    <div className="p-2 max-w-[300px]">
      <div className="space-y-3">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img
            src={property.featuredWeb || property.featuredImage}
            alt={property.address.formattedAddress}
            className="object-cover w-full h-full"
          />
          <Badge
            className="absolute top-2 right-2"
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

        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-sm">{property.address.formattedAddress}</h3>
              <p className="text-xs text-muted-foreground">
                {property.data.summary.propType} • {property.data.building.rooms.beds} bed • {property.data.building.rooms.bathsFull} bath
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/properties/${property.id}`);
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            {property.projects.length} Active Projects
          </div>
        </div>
      </div>
    </div>
  );
}
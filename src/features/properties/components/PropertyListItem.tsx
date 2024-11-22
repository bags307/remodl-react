import { Property } from '@/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PropertyListItemProps {
  property: Property;
  onClick: () => void;
}

export function PropertyListItem({ property, onClick }: PropertyListItemProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={property.featuredWeb || property.featuredImage}
            alt={property.address.formattedAddress}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
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
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium text-sm line-clamp-1">
              {property.address.formattedAddress}
            </h3>
            <p className="text-xs text-muted-foreground">
              {property.data.summary.propType} • {property.data.building.rooms.beds} bed • {property.data.building.rooms.bathsFull} bath
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/properties/${property.id}`);
            }}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
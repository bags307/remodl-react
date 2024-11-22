import { ScrollArea } from '@/components/ui/scroll-area';
import { Property } from '@/types';
import { PropertyListItem } from './PropertyListItem';
import { Loader2 } from 'lucide-react';

interface PropertyListProps {
  properties: Property[];
  isLoading: boolean;
  onPropertyClick: (property: Property) => void;
}

export function PropertyList({ properties, isLoading, onPropertyClick }: PropertyListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        {properties.map((property) => (
          <PropertyListItem
            key={property.id}
            property={property}
            onClick={() => onPropertyClick(property)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
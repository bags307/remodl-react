import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ImageContentProps {
  image: {
    url: string;
    alt?: string;
    caption?: string;
  };
}

export function ImageContent({ image }: ImageContentProps) {
  return (
    <div className="rounded-lg overflow-hidden border bg-muted">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src={image.url}
          alt={image.alt || 'Generated image'}
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      <div className="p-2 flex items-center justify-between">
        {image.caption && (
          <p className="text-sm text-muted-foreground">{image.caption}</p>
        )}
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
}
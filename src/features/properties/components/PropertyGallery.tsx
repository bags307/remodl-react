import { Property } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface PropertyGalleryProps {
  property: Property;
}

// Mock gallery data
const mockImages = Array(10).fill(null).map((_, i) => ({
  id: `image-${i}`,
  url: `https://picsum.photos/seed/${i}/800/600`,
  title: `Image ${i + 1}`,
  date: new Date(Date.now() - Math.random() * 10000000000),
  tags: ['exterior', 'interior', 'renovation'][Math.floor(Math.random() * 3)],
}));

export function PropertyGallery({ property }: PropertyGalleryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Property Gallery</CardTitle>
          <Badge variant="secondary">
            {mockImages.length} Photos
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {mockImages.map((image) => (
              <CarouselItem key={image.id} className="basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <AspectRatio ratio={4/3} className="bg-muted">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="rounded-md object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        {image.tags}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {image.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
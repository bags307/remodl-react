import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

const projects = [
  {
    url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    title: 'Modern Kitchen Remodel',
    address: '123 Main St, Austin, TX',
    status: 'In Progress',
    startDate: 'Jan 15, 2024',
    endDate: 'Mar 15, 2024',
    progress: 65,
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    title: 'Living Room Renovation',
    address: '456 Oak Ave, Dallas, TX',
    status: 'Planning',
    startDate: 'Mar 1, 2024',
    endDate: 'Apr 30, 2024',
    progress: 15,
  },
  {
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
    title: 'Master Bath Update',
    address: '789 Pine Rd, Houston, TX',
    status: 'Completed',
    startDate: 'Dec 1, 2023',
    endDate: 'Jan 30, 2024',
    progress: 100,
  },
];

export function ProjectGallery() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Recent renovation updates</CardDescription>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {projects.length} Projects
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-0">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={project.url}
                          alt={project.title}
                          className="rounded-lg object-cover w-full h-full"
                        />
                      </AspectRatio>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{project.title}</h3>
                          <Badge
                            variant={
                              project.status === 'Completed'
                                ? 'default'
                                : project.status === 'In Progress'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.address}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {project.startDate} - {project.endDate}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
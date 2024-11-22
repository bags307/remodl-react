import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const updates = [
  {
    date: '2024-02-28',
    title: 'Plumbing Installation Complete',
    description: 'All bathroom fixtures have been installed and tested',
    type: 'success',
  },
  {
    date: '2024-02-27',
    title: 'Electrical Inspection',
    description: 'Passed initial electrical inspection',
    type: 'info',
  },
  {
    date: '2024-02-26',
    title: 'Material Delivery Delay',
    description: 'Tile delivery delayed by 2 days',
    type: 'warning',
  },
  {
    date: '2024-02-25',
    title: 'Drywall Installation',
    description: 'Started drywall installation in master bedroom',
    type: 'info',
  },
];

export function Updates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Updates</CardTitle>
        <CardDescription>Latest project activities</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {updates.map((update, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{update.title}</span>
                  <Badge
                    variant={
                      update.type === 'success'
                        ? 'default'
                        : update.type === 'warning'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {update.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {update.description}
                </p>
                <time className="text-xs text-muted-foreground">
                  {new Date(update.date).toLocaleDateString()}
                </time>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
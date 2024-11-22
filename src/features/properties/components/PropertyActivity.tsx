import { Property } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatTimeAgo } from '@/lib/utils';
import {
  Building2, Camera, ClipboardCheck, AlertTriangle, Calendar,
  MessageSquare, FileText, Wrench, CheckCircle2, Plus,
  Settings, User, Truck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyActivityProps {
  property: Property;
}

type ActivityType = 
  | 'property_new'
  | 'property_details'
  | 'property_photos'
  | 'inspection'
  | 'inspection_complete'
  | 'issue'
  | 'message'
  | 'document'
  | 'work_order'
  | 'vendor'
  | 'team';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  status?: string;
  priority: 1 | 2 | 3;
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: {
    [key: string]: any;
  };
}

const getActivityIcon = (type: ActivityType) => {
  const icons = {
    property_new: Building2,
    property_details: Settings,
    property_photos: Camera,
    inspection: ClipboardCheck,
    inspection_complete: CheckCircle2,
    issue: AlertTriangle,
    message: MessageSquare,
    document: FileText,
    work_order: Wrench,
    vendor: Truck,
    team: User,
  };
  return icons[type] || Plus;
};

const getActivityColor = (type: ActivityType, priority: number) => {
  const baseColors = {
    property_new: 'text-green-500',
    property_details: 'text-blue-500',
    property_photos: 'text-purple-500',
    inspection: 'text-orange-500',
    inspection_complete: 'text-green-500',
    issue: 'text-red-500',
    message: 'text-blue-500',
    document: 'text-gray-500',
    work_order: 'text-yellow-500',
    vendor: 'text-indigo-500',
    team: 'text-teal-500',
  };

  return baseColors[type] || 'text-gray-500';
};

// Mock activity data with enhanced structure
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'property_new',
    title: 'Property Added',
    description: 'Property was added to the system',
    timestamp: new Date(Date.now() - 1000000),
    priority: 1,
    user: {
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
  },
  {
    id: '2',
    type: 'property_photos',
    title: 'Photos Added',
    description: '12 new photos uploaded',
    timestamp: new Date(Date.now() - 2000000),
    priority: 2,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    metadata: {
      photoCount: 12,
    },
  },
  {
    id: '3',
    type: 'inspection',
    title: 'Inspection Scheduled',
    description: 'Property inspection scheduled for next week',
    timestamp: new Date(Date.now() - 3000000),
    status: 'pending',
    priority: 2,
    metadata: {
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  },
  {
    id: '4',
    type: 'issue',
    title: 'Issue Reported',
    description: 'Water damage found in basement',
    timestamp: new Date(Date.now() - 4000000),
    status: 'high',
    priority: 1,
    user: {
      name: 'Mike Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
  },
  {
    id: '5',
    type: 'work_order',
    title: 'Work Order Created',
    description: 'Plumbing repair work order created',
    timestamp: new Date(Date.now() - 5000000),
    status: 'in-progress',
    priority: 2,
  },
];

export function PropertyActivity({ property }: PropertyActivityProps) {
  return (
    <div className="min-w-[300px] h-full bg-card rounded-lg border">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg">Activity Feed</h3>
        <Badge variant="secondary">
          {mockActivities.length} Activities
        </Badge>
      </div>

      <ScrollArea className="h-[calc(100%-4rem)]">
        <div className="relative p-4">
          {/* Activity Timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {mockActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const iconColor = getActivityColor(activity.type, activity.priority);

              return (
                <div
                  key={activity.id}
                  className="relative pl-8 group"
                >
                  {/* Timeline Node */}
                  <div className={cn(
                    "absolute left-4 -translate-x-1/2 -translate-y-1/2 p-1 rounded-full border bg-background group-hover:scale-110 transition-transform",
                    activity.priority === 1 ? "top-4" : "top-6"
                  )}>
                    <Icon className={cn("h-4 w-4", iconColor)} />
                  </div>

                  {/* Activity Content */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-x-2">
                      {activity.user && (
                        <img
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="h-6 w-6 rounded-full"
                        />
                      )}
                      <span className="font-medium text-sm">
                        {activity.title}
                      </span>
                      {activity.status && (
                        <Badge
                          variant={
                            activity.status === 'completed'
                              ? 'default'
                              : activity.status === 'in-progress'
                              ? 'secondary'
                              : activity.status === 'high'
                              ? 'destructive'
                              : 'outline'
                          }
                          className="text-[10px] px-1 py-0"
                        >
                          {activity.status}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatTimeAgo(activity.timestamp)}
                      {activity.metadata?.date && (
                        <span>
                          • Scheduled for {activity.metadata.date.toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {activity.metadata?.photoCount && (
                      <div className="mt-2 flex items-center gap-2">
                        <Camera className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {activity.metadata.photoCount} photos
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
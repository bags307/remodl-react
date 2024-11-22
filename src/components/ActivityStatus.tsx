import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';

export function ActivityStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>Current renovation progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">65%</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Time Remaining:</span>
            <Badge variant="secondary">2 weeks</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Expected Completion:</span>
            <Badge variant="secondary">March 15, 2024</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Active Phases</h4>
          <div className="space-y-1">
            <Badge className="mr-1">Plumbing</Badge>
            <Badge className="mr-1" variant="secondary">
              Electrical
            </Badge>
            <Badge variant="outline">Flooring</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
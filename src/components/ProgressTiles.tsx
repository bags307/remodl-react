import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CircleDollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const tiles = [
  {
    title: 'Budget Spent',
    value: '$45,280',
    total: '$75,000',
    progress: 60,
    icon: CircleDollarSign,
    color: 'text-green-500',
  },
  {
    title: 'Time Elapsed',
    value: '45 days',
    total: '90 days',
    progress: 50,
    icon: Clock,
    color: 'text-blue-500',
  },
  {
    title: 'Tasks Completed',
    value: '24',
    total: '40',
    progress: 60,
    icon: CheckCircle2,
    color: 'text-purple-500',
  },
  {
    title: 'Open Issues',
    value: '3',
    total: '3',
    progress: 100,
    icon: AlertCircle,
    color: 'text-orange-500',
  },
];

export function ProgressTiles() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {tiles.map((tile, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {tile.title}
            </CardTitle>
            <tile.icon className={`h-4 w-4 ${tile.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tile.value}</div>
            <div className="flex items-center justify-between mt-2 mb-1">
              <p className="text-xs text-muted-foreground">
                of {tile.total}
              </p>
              <p className="text-xs font-medium">{tile.progress}%</p>
            </div>
            <Progress value={tile.progress} className="h-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
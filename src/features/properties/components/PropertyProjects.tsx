import { Property } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';

interface PropertyProjectsProps {
  property: Property;
}

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  budget: number;
  spent: number;
}

// Mock project data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Kitchen Renovation',
    status: 'in-progress',
    progress: 65,
    budget: 45000,
    spent: 28000,
  },
  {
    id: '2',
    name: 'Bathroom Remodel',
    status: 'planning',
    progress: 15,
    budget: 25000,
    spent: 5000,
  },
  {
    id: '3',
    name: 'Exterior Paint',
    status: 'completed',
    progress: 100,
    budget: 12000,
    spent: 11500,
  },
];

export function PropertyProjects({ property }: PropertyProjectsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Active Projects</CardTitle>
          <Badge variant="secondary">
            {mockProjects.length} Projects
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockProjects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        project.status === 'completed'
                          ? 'default'
                          : project.status === 'in-progress'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {project.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(project.spent)} of {formatCurrency(project.budget)}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium">{project.progress}%</div>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
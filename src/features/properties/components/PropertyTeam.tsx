import { Property } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface PropertyTeamProps {
  property: Property;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'active' | 'away' | 'offline';
}

// Mock team data
const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Project Manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Site Supervisor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    status: 'away',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    role: 'Inspector',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    status: 'offline',
  },
];

export function PropertyTeam({ property }: PropertyTeamProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTeam.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {member.role}
                  </div>
                </div>
              </div>
              <Badge
                variant={
                  member.status === 'active'
                    ? 'default'
                    : member.status === 'away'
                    ? 'secondary'
                    : 'outline'
                }
              >
                {member.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const workOrders = [
  {
    id: 'WO-001',
    title: 'Install Kitchen Cabinets',
    assignee: 'John Carpenter',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-03-05',
  },
  {
    id: 'WO-002',
    title: 'Bathroom Tiling',
    assignee: 'Mike Mason',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '2024-03-08',
  },
  {
    id: 'WO-003',
    title: 'Paint Living Room',
    assignee: 'Sarah Painter',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2024-03-02',
  },
  {
    id: 'WO-004',
    title: 'Install Light Fixtures',
    assignee: 'Tom Electric',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2024-03-06',
  },
];

export function WorkOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Work Orders</CardTitle>
        <CardDescription>Current renovation tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.title}</TableCell>
                <TableCell>{order.assignee}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === 'Completed'
                        ? 'default'
                        : order.status === 'In Progress'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.priority === 'High'
                        ? 'destructive'
                        : order.priority === 'Medium'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {order.priority}
                  </Badge>
                </TableCell>
                <TableCell>{order.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
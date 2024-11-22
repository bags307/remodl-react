import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const categories = [
  { name: 'Materials', spent: 25000, budget: 35000, color: 'bg-blue-500' },
  { name: 'Labor', spent: 15000, budget: 25000, color: 'bg-green-500' },
  { name: 'Fixtures', spent: 5280, budget: 10000, color: 'bg-purple-500' },
  { name: 'Permits', spent: 2000, budget: 5000, color: 'bg-orange-500' },
];

export function BudgetManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>Track expenses by category</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{category.name}</span>
              <span className="text-muted-foreground">
                ${category.spent.toLocaleString()} of $
                {category.budget.toLocaleString()}
              </span>
            </div>
            <Progress
              value={(category.spent / category.budget) * 100}
              className="h-2"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
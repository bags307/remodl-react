import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { subDays, format } from 'date-fns';

interface UsageData {
  date: string;
  messages: number;
  interactions: number;
  documents: number;
}

// Generate mock data for the last 30 days
const generateMockData = (): UsageData[] => {
  return Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), 29 - i);
    return {
      date: format(date, 'MMM dd'),
      messages: Math.floor(Math.random() * 1000) + 500,
      interactions: Math.floor(Math.random() * 800) + 300,
      documents: Math.floor(Math.random() * 200) + 50,
    };
  });
};

const data = generateMockData();

export function UsageChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Platform Usage</CardTitle>
          <Tabs defaultValue="30d">
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="messages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8ac7ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8ac7ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="interactions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ee8b60" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ee8b60" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="documents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DFE369" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#DFE369" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Area
                type="monotone"
                dataKey="messages"
                stroke="#8ac7ff"
                fillOpacity={1}
                fill="url(#messages)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="interactions"
                stroke="#ee8b60"
                fillOpacity={1}
                fill="url(#interactions)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="documents"
                stroke="#DFE369"
                fillOpacity={1}
                fill="url(#documents)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#8ac7ff]" />
            <span className="text-sm text-muted-foreground">Messages</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ee8b60]" />
            <span className="text-sm text-muted-foreground">Interactions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#DFE369]" />
            <span className="text-sm text-muted-foreground">Documents</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
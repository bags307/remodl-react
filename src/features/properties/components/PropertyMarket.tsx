import { Property } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';

interface PropertyMarketProps {
  property: Property;
}

export function PropertyMarket({ property }: PropertyMarketProps) {
  const marketValue = property.data.assessment.market.mktTtlValue;
  const avgMarketValue = marketValue * 1.1; // Mock average market value
  const percentileRank = 65; // Mock percentile rank

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Market Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Market Value</span>
            <span className="font-medium">
              {formatCurrency(marketValue)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Area Average</span>
            <span className="font-medium">
              {formatCurrency(avgMarketValue)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Market Position</span>
            <span className="font-medium">{percentileRank}th percentile</span>
          </div>
          <Progress value={percentileRank} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Compared to similar properties in the area
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Market Trends</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-green-500">+5.2%</div>
              <div className="text-xs text-muted-foreground">
                Value Change (YTD)
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">+8.1%</div>
              <div className="text-xs text-muted-foreground">
                Area Appreciation
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
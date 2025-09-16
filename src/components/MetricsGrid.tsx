
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Thermometer, Activity, Fan } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const metrics = [
  {
    title: 'Equipment Health Score',
    value: '94%',
    change: '+2.1%',
    trend: 'up',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Active Alerts',
    value: '3',
    change: '-1',
    trend: 'down',
    icon: TrendingDown,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Avg Temperature',
    value: '68.4°F',
    change: '+0.8°F',
    trend: 'up',
    icon: Thermometer,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Fan Systems',
    value: '12 Active',
    change: 'All operational',
    trend: 'stable',
    icon: Fan,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

export const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {metric.change}
                </Badge>
                <span>from last hour</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Thermometer, Activity, Fan } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'warning',
    equipment: 'Motor Unit A',
    message: 'Vibration levels trending upward',
    timestamp: '2 min ago',
    severity: 'medium',
    icon: Activity
  },
  {
    id: 2,
    type: 'alert',
    equipment: 'Pump B',
    message: 'Temperature spike detected',
    timestamp: '5 min ago',
    severity: 'high',
    icon: Thermometer
  },
  {
    id: 3,
    type: 'warning',
    equipment: 'Cooling Fan C1',
    message: 'RPM fluctuation detected',
    timestamp: '8 min ago',
    severity: 'low',
    icon: Fan
  },
  {
    id: 4,
    type: 'warning',
    equipment: 'Exhaust Fan C2',
    message: 'Performance below optimal',
    timestamp: '12 min ago',
    severity: 'low',
    icon: Fan
  }
];

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-orange-100 text-orange-800';
    case 'low': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const AlertsPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Active Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-sm">{alert.equipment}</span>
                </div>
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{alert.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{alert.timestamp}</span>
                <Button size="sm" variant="outline" className="text-xs">
                  Acknowledge
                </Button>
              </div>
            </div>
          );
        })}
        <Button className="w-full" variant="outline">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
};

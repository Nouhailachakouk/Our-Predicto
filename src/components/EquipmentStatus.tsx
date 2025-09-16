
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Monitor, CheckCircle, AlertCircle, XCircle, Fan } from 'lucide-react';

const equipment = [
  {
    id: 'motor-a',
    name: 'Motor Unit A',
    status: 'operational',
    health: 94,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    alerts: 1
  },
  {
    id: 'pump-b',
    name: 'Pump B',
    status: 'warning',
    health: 78,
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-02-10',
    alerts: 2
  },
  {
    id: 'fan-c1',
    name: 'Cooling Fan C1',
    status: 'operational',
    health: 96,
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-02-20',
    alerts: 0
  },
  {
    id: 'fan-c2',
    name: 'Exhaust Fan C2',
    status: 'operational',
    health: 92,
    lastMaintenance: '2024-01-18',
    nextMaintenance: '2024-02-18',
    alerts: 0
  },
  {
    id: 'press-d',
    name: 'Hydraulic Press D',
    status: 'maintenance',
    health: 45,
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-01-25',
    alerts: 0
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'operational': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'warning': return <AlertCircle className="h-4 w-4 text-orange-600" />;
    case 'maintenance': return <XCircle className="h-4 w-4 text-red-600" />;
    default: return <Monitor className="h-4 w-4 text-gray-600" />;
  }
};

const getEquipmentIcon = (name) => {
  if (name.toLowerCase().includes('fan')) {
    return <Fan className="h-4 w-4 text-purple-600" />;
  }
  return <Monitor className="h-4 w-4 text-gray-600" />;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'operational': return 'bg-green-100 text-green-800';
    case 'warning': return 'bg-orange-100 text-orange-800';
    case 'maintenance': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getHealthColor = (health) => {
  if (health >= 90) return 'text-green-600';
  if (health >= 70) return 'text-orange-600';
  return 'text-red-600';
};

export const EquipmentStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Monitor className="h-5 w-5" />
          <span>Equipment Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-600">Equipment</th>
                <th className="text-left py-2 font-medium text-gray-600">Status</th>
                <th className="text-left py-2 font-medium text-gray-600">Health Score</th>
                <th className="text-left py-2 font-medium text-gray-600">Next Maintenance</th>
                <th className="text-left py-2 font-medium text-gray-600">Alerts</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      {getEquipmentIcon(item.name)}
                      {getStatusIcon(item.status)}
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <Progress value={item.health} className="w-16" />
                      <span className={`text-sm font-medium ${getHealthColor(item.health)}`}>
                        {item.health}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {item.nextMaintenance}
                  </td>
                  <td className="py-3">
                    {item.alerts > 0 ? (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        {item.alerts}
                      </Badge>
                    ) : (
                      <span className="text-sm text-gray-500">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

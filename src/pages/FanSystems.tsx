
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Fan, Activity, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fanData = [
  { time: '00:00', fan1: 1200, fan2: 1150, fan3: 1180, fan4: 1220 },
  { time: '04:00', fan1: 1250, fan2: 1200, fan3: 1230, fan4: 1270 },
  { time: '08:00', fan1: 1300, fan2: 1250, fan3: 1280, fan4: 1320 },
  { time: '12:00', fan1: 1350, fan2: 1300, fan3: 1330, fan4: 1370 },
  { time: '16:00', fan1: 1280, fan2: 1230, fan3: 1260, fan4: 1300 },
  { time: '20:00', fan1: 1200, fan2: 1150, fan3: 1180, fan4: 1220 },
];

const fans = [
  { id: 'FAN-001', name: 'Cooling Fan A1', status: 'operational', rpm: 1250, efficiency: 96, location: 'Zone A' },
  { id: 'FAN-002', name: 'Exhaust Fan B1', status: 'warning', rpm: 1180, efficiency: 89, location: 'Zone B' },
  { id: 'FAN-003', name: 'Intake Fan C1', status: 'operational', rpm: 1300, efficiency: 94, location: 'Zone C' },
  { id: 'FAN-004', name: 'Cooling Fan A2', status: 'operational', rpm: 1220, efficiency: 97, location: 'Zone A' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational': return 'bg-green-100 text-green-800';
    case 'warning': return 'bg-yellow-100 text-yellow-800';
    case 'error': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational': return <CheckCircle className="h-4 w-4" />;
    case 'warning': return <AlertTriangle className="h-4 w-4" />;
    case 'error': return <AlertTriangle className="h-4 w-4" />;
    default: return <Activity className="h-4 w-4" />;
  }
};

const FanSystems = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Fan Systems Management</h1>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Configure Systems
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Fan className="h-5 w-5" />
            <span>Real-time Fan Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fanData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="fan1" stroke="#3b82f6" name="Fan A1" />
              <Line type="monotone" dataKey="fan2" stroke="#ef4444" name="Fan B1" />
              <Line type="monotone" dataKey="fan3" stroke="#10b981" name="Fan C1" />
              <Line type="monotone" dataKey="fan4" stroke="#f59e0b" name="Fan A2" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fans.map((fan) => (
          <Card key={fan.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{fan.name}</CardTitle>
              <Badge className={getStatusColor(fan.status)}>
                {getStatusIcon(fan.status)}
                <span className="ml-1">{fan.status}</span>
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">RPM</p>
                  <p className="text-2xl font-bold">{fan.rpm}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Efficiency</p>
                  <p className="text-2xl font-bold">{fan.efficiency}%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Location: {fan.location}</span>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FanSystems;

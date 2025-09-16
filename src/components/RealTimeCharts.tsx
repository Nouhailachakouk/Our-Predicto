
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Play, Pause, Fan } from 'lucide-react';

export const RealTimeCharts = () => {
  const [isRealTime, setIsRealTime] = useState(true);
  const [vibrationData, setVibrationData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [fanData, setFanData] = useState([]);

  // Initialize with some starting data
  useEffect(() => {
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      time: new Date(Date.now() - (9 - i) * 1000).toLocaleTimeString(),
      value: 2.5 + Math.random() * 1.5,
      threshold: 4.0
    }));
    
    const initialTempData = Array.from({ length: 10 }, (_, i) => ({
      time: new Date(Date.now() - (9 - i) * 1000).toLocaleTimeString(),
      value: 68 + Math.random() * 6,
      threshold: 75
    }));

    const initialFanData = Array.from({ length: 10 }, (_, i) => ({
      time: new Date(Date.now() - (9 - i) * 1000).toLocaleTimeString(),
      value: 1200 + Math.random() * 400,
      threshold: 1800
    }));

    setVibrationData(initialData);
    setTemperatureData(initialTempData);
    setFanData(initialFanData);
  }, []);

  // Simulate real-time data
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      
      setVibrationData(prev => {
        const newData = [...prev.slice(-19), {
          time: timestamp,
          value: 2.5 + Math.random() * 1.5,
          threshold: 4.0
        }];
        return newData;
      });

      setTemperatureData(prev => {
        const newData = [...prev.slice(-19), {
          time: timestamp,
          value: 68 + Math.random() * 6,
          threshold: 75
        }];
        return newData;
      });

      setFanData(prev => {
        const newData = [...prev.slice(-19), {
          time: timestamp,
          value: 1200 + Math.random() * 400,
          threshold: 1800
        }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Real-Time Sensor Data</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRealTime(!isRealTime)}
            className="flex items-center space-x-2"
          >
            {isRealTime ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isRealTime ? 'Pause' : 'Resume'}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vibration" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vibration">Vibration</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="fan">Fan Speed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vibration" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vibrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 6]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="threshold" 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Current: {vibrationData[vibrationData.length - 1]?.value?.toFixed(2) || '0.00'} mm/s
            </p>
          </TabsContent>
          
          <TabsContent value="temperature" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[60, 80]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="threshold" 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Current: {temperatureData[temperatureData.length - 1]?.value?.toFixed(1) || '0.0'}°F
            </p>
          </TabsContent>

          <TabsContent value="fan" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fanData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[1000, 2000]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="threshold" 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Current: {fanData[fanData.length - 1]?.value?.toFixed(0) || '0'} RPM
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

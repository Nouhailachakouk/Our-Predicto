
import React from 'react';
import { MetricsGrid } from './MetricsGrid';
import { RealTimeCharts } from './RealTimeCharts';
import { AlertsPanel } from './AlertsPanel';
import { EquipmentStatus } from './EquipmentStatus';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Predictive Maintenance Dashboard</h2>
        <p className="text-gray-600">Monitor equipment health, detect anomalies, and prevent failures</p>
      </div>
      
      <MetricsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RealTimeCharts />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>
      
      <EquipmentStatus />
    </div>
  );
};

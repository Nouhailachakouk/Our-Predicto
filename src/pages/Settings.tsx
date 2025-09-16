
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>User Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Real-time Updates</span>
              <Switch defaultChecked />
            </div>
            <Button className="w-full">Save Preferences</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Alert Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Critical Alerts</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Warning Alerts</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>SMS Notifications</span>
              <Switch />
            </div>
            <Button className="w-full">Update Alert Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">Change Password</Button>
            <Button variant="outline" className="w-full">Two-Factor Authentication</Button>
            <Button variant="outline" className="w-full">Session Management</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>System Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">Database Settings</Button>
            <Button variant="outline" className="w-full">API Configuration</Button>
            <Button variant="outline" className="w-full">Backup Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

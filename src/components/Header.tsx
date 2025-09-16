
import React from 'react';
import { Bell, Settings, User, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Predicto</h1>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            All Systems Operational
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
            <span className="ml-2 hidden md:inline">Nouhaila Engineer</span>
          </Button>
          {user && (
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-5 w-5" />
              <span className="ml-2 hidden md:inline">Sign Out</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

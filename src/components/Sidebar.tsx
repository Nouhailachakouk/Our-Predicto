
import React, { useState } from 'react';
import { Monitor, TrendingUp, Settings, FileText, Database, Bell, Fan, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Monitor },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'fans', label: 'Fan Systems', icon: Fan },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'data', label: 'Data Management', icon: Database },
  { id: 'data-analysis', label: 'AI Analysis', icon: Brain },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

export const Sidebar = ({ activeItem, onItemClick }: SidebarProps) => {
  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left",
                activeItem === item.id && "bg-blue-50 text-blue-700"
              )}
              onClick={() => onItemClick(item.id)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};

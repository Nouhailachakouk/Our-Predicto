
import React, { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import Analytics from './Analytics';
import FanSystems from './FanSystems';
import Alerts from './Alerts';
import DataManagement from './DataManagement';
import DataAnalysis from './DataAnalysis';
import Reports from './Reports';
import Settings from './Settings';

const Index = () => {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'fans':
        return <FanSystems />;
      case 'alerts':
        return <Alerts />;
      case 'data':
        return <DataManagement />;
      case 'data-analysis':
        return <DataAnalysis />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeItem={activeSection} onItemClick={setActiveSection} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;

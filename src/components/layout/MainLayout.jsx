import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import Dashboard from '../dashboard/DashboardGrid';
import Leads from '../leads/LeadsManagement';
import Analytics from '../analytics/Analytics';
import Reports from '../reports/Reports';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeView, setActiveView } = useDashboard();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'leads', label: 'Leads', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'reports', label: 'Reports', icon: '📑' }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <Leads />;
      case 'analytics':
        return <Analytics />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed lg:static lg:flex w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <nav className="flex-1 p-4">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center p-3 mb-2 rounded-lg ${
                  activeView === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
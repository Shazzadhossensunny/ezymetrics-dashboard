import React from 'react';
import Analytics from "./components/analytics/Analytics";
import DashboardGrid from "./components/dashboard/DashboardGrid";
import Layout from "./components/layout/Layout";
import LeadsManagement from "./components/leads/LeadsManagement";
import ReportsGenerator from "./components/reports/ReportGenerator";
import { DashboardProvider, useDashboard } from "./context/DashboardContext";

const AppContent = () => {
  const { activeView } = useDashboard();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardGrid />;
      case 'leads':
        return <LeadsManagement />;
      case 'analytics':
        return <Analytics />;
      case 'reports':
        return <ReportsGenerator />;
      default:
        return <DashboardGrid />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

function App() {
  return (
    <DashboardProvider>
      <AppContent />
    </DashboardProvider>
  );
}

export default App;
import React from 'react';
import { DashboardProvider } from './context/DashboardContext';
import MainLayout from './components/layout/MainLayout';

const App = () => {
  return (
    <DashboardProvider>
      <MainLayout />
    </DashboardProvider>
  );
};

export default App;
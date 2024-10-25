import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [activeView, setActiveView] = useState('dashboard');
  const [widgets, setWidgets] = useState([
    { id: 'sales', enabled: true },
    { id: 'leads', enabled: true },
    { id: 'performance', enabled: true }
  ]);
  const [filters, setFilters] = useState({
    dateRange: 'month',
    status: 'all',
    source: 'all'
  });

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'John Smith',
      company: 'Tech Corp',
      email: 'john@techcorp.com',
      status: 'New',
      value: 5000
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'Digital Solutions',
      email: 'sarah@digital.com',
      status: 'In Progress',
      value: 7500
    },
    {
      id: 3,
      name: 'Michael Brown',
      company: 'Innovative Systems',
      email: 'michael@innovative.com',
      status: 'Closed',
      value: 10000
    }
  ]);

  const toggleWidget = (widgetId) => {
    setWidgets(widgets.map(w =>
      w.id === widgetId ? { ...w, enabled: !w.enabled } : w
    ));
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const addLead = (lead) => {
    setLeads([...leads, { ...lead, id: leads.length + 1 }]);
  };

  const updateLead = (id, updatedLead) => {
    setLeads(leads.map(lead =>
      lead.id === id ? { ...lead, ...updatedLead } : lead
    ));
  };

  const deleteLead = (id) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  return (
    <DashboardContext.Provider value={{
      activeView,
      setActiveView,
      widgets,
      toggleWidget,
      filters,
      updateFilters,
      leads,
      addLead,
      updateLead,
      deleteLead
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

export default DashboardContext;
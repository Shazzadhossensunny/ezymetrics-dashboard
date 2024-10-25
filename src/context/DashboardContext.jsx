import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [widgets, setWidgets] = useState([
    { id: 'sales', title: 'Sales Overview', enabled: true, order: 1 },
    { id: 'leads', title: 'Lead Sources', enabled: true, order: 2 },
    { id: 'performance', title: 'Performance Metrics', enabled: true, order: 3 }
  ]);

  // Load leads from local storage or use dummy data
  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem('leads');
    return savedLeads ? JSON.parse(savedLeads) : [
      {
        id: 1,
        name: "John Smith",
        company: "Tech Corp",
        email: "john@techcorp.com",
        phone: "+1 (555) 123-4567",
        status: "New",
        source: "Website",
        value: 5000,
        lastContact: "2024-03-15"
      },
      // Additional dummy leads
    ];
  });

  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  const addLead = (lead) => {
    setLeads([...leads, { ...lead, id: Date.now() }]);
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
      leads,
      addLead,
      updateLead,
      deleteLead
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

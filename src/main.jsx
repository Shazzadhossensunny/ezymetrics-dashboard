import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App.jsx'
import { DashboardProvider } from './context/DashboardContext.jsx';

ReactDOM.render(
  <DashboardProvider>
    <App />
  </DashboardProvider>,
  document.getElementById('root')
);

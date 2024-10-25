import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const WidgetContent = ({ widgetId }) => {
  const salesData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  const leadsData = [
    { name: 'Website', value: 45 },
    { name: 'Referral', value: 30 },
    { name: 'Social', value: 15 },
    { name: 'Other', value: 10 },
  ];

  const performanceData = [
    { month: 'Jan', actual: 4000, target: 4500 },
    { month: 'Feb', actual: 3000, target: 3500 },
    { month: 'Mar', actual: 2000, target: 2500 },
    { month: 'Apr', actual: 2780, target: 2800 },
    { month: 'May', actual: 1890, target: 2000 },
    { month: 'Jun', actual: 2390, target: 2400 },
  ];

  switch (widgetId) {
    case 'sales':
      return (
        <div>
          <BarChart width={300} height={200} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      );

    case 'leads':
      return (
        <div>
          <BarChart width={300} height={200} data={leadsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>
      );

    case 'performance':
      return (
        <div>
          <LineChart width={300} height={200} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#8884d8" />
            <Line type="monotone" dataKey="target" stroke="#82ca9d" />
          </LineChart>
        </div>
      );

    default:
      return <div>Widget content not found</div>;
  }
};

export default WidgetContent;
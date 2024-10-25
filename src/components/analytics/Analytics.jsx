import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const Analytics = () => {
  const performanceData = [
    { month: 'Jan', leads: 45, conversions: 20, revenue: 25000 },
    { month: 'Feb', leads: 52, conversions: 25, revenue: 30000 },
    { month: 'Mar', leads: 61, conversions: 30, revenue: 35000 },
    { month: 'Apr', leads: 67, conversions: 35, revenue: 40000 },
    { month: 'May', leads: 75, conversions: 40, revenue: 45000 },
    { month: 'Jun', leads: 82, conversions: 45, revenue: 50000 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Analytics Overview</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Performance Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Lead Performance</h3>
          <LineChart width={500} height={300} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="leads" stroke="#8884d8" />
            <Line type="monotone" dataKey="conversions" stroke="#82ca9d" />
          </LineChart>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <BarChart width={500} height={300} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Key Metrics */}
        <div className="bg-white p-4 rounded-lg shadow col-span-full">
          <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Total Leads</p>
              <p className="text-2xl font-bold">382</p>
              <p className="text-sm text-green-600">↑ 12.5% vs last month</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Conversion Rate</p>
              <p className="text-2xl font-bold">48.2%</p>
              <p className="text-sm text-green-600">↑ 5.3% vs last month</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600">Average Deal Size</p>
              <p className="text-2xl font-bold">$12,500</p>
              <p className="text-sm text-red-600">↓ 2.1% vs last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
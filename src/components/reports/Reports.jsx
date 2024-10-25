import React, { useState } from 'react';
import { format } from 'date-fns';
import { useDashboard } from '../../context/DashboardContext';
import PDFReport from './PDFReport';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Reports = () => {
  const { leads } = useDashboard();
  const [reportType, setReportType] = useState('leads');
  const [dateRange, setDateRange] = useState('last30');
  const [format, setFormat] = useState('pdf');

  const generateReport = () => {
    console.log('Generating report:', { reportType, dateRange, format });

    // Filter leads based on the selected date range
    const filteredData = leads.filter(lead => {
      const leadDate = new Date(lead.lastContact);
      const now = new Date();

      let dateLimit;
      switch (dateRange) {
        case 'last7':
          dateLimit = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'last30':
          dateLimit = new Date(now.setDate(now.getDate() - 30));
          break;
        case 'last90':
          dateLimit = new Date(now.setDate(now.getDate() - 90));
          break;
        case 'yearToDate':
          dateLimit = new Date(now.getFullYear(), 0, 1); // January 1 of the current year
          break;
        default:
          dateLimit = null;
      }

      // Return true if no date limit, otherwise filter by date range
      return !dateLimit || leadDate >= dateLimit;
    });

    if (filteredData.length === 0) {
      alert("No data available to generate CSV.");
      return;
    }

    // Handle CSV download if selected
    if (format === 'csv') {
      const csvContent = convertToCSV(filteredData);
      downloadCSV(csvContent, `${reportType}_report_${Date.now()}.csv`);
    }

    // Handle PDF generation logic if selected (not shown here)
  };


  const convertToCSV = (data) => {
    // Check if data exists and has at least one item
    if (!data || data.length === 0) {
      console.warn("No data available to generate CSV.");
      return ''; // Return an empty string if data is empty
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj =>
      Object.values(obj).map(value => (value !== null && value !== undefined ? value : '')).join(',')
    );

    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (content, fileName) => {
    if (!content) {
      console.warn("No content available for download.");
      return;
    }

    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link); // Append to the document to make it clickable
    link.click();
    document.body.removeChild(link); // Clean up
    window.URL.revokeObjectURL(url); // Release the URL object
  };


  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Report Generation</h2>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Report Type</label>
            <select
              className="w-full border rounded-lg p-2"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="leads">Leads Report</option>
              <option value="performance">Performance Report</option>
              <option value="revenue">Revenue Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <select
              className="w-full border rounded-lg p-2"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="yearToDate">Year to Date</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Format</label>
            <select
              className="w-full border rounded-lg p-2"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div className="flex items-end">
          {format === 'pdf' && (
            <PDFDownloadLink
              document={<PDFReport leads={leads} />}
              fileName={`${reportType}_report_${Date.now()}.pdf`}
            >
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Generate PDF Report
              </button>
            </PDFDownloadLink>
          )}
          {format === 'csv' && (
            <button
              onClick={generateReport}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate CSV Report
            </button>
          )}
          </div>
        </div>

        {/* Report Preview */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Report Preview</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 p-2 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium">Total Leads</p>
                <p className="text-xl">127</p>
              </div>
              <div>
                <p className="text-sm font-medium">Conversion Rate</p>
                <p className="text-xl">45.3%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Total Revenue</p>
                <p className="text-xl">$45,250</p>
              </div>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leads</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">2024-03-{15 - index}</td>
                    <td className="px-6 py-4">{Math.floor(Math.random() * 20) + 10}</td>
                    <td className="px-6 py-4">${(Math.random() * 10000).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
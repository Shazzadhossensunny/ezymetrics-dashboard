import React, { useState, useEffect } from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import * as echarts from 'echarts';

const ReportsGenerator = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('month');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    minValue: '',
    maxValue: ''
  });

  // Sample data for different report types
  const reportData = {
    sales: {
      headers: ['Date', 'Revenue', 'Leads', 'Conversions'],
      data: [
        ['Week 1', 12000, 120, 20],
        ['Week 2', 15000, 150, 30],
        ['Week 3', 13000, 130, 25],
        ['Week 4', 18000, 180, 35]
      ]
    },
    leads: {
      headers: ['Date', 'New Leads', 'Qualified Leads', 'Conversion Rate'],
      data: [
        ['Week 1', 100, 45, '45%'],
        ['Week 2', 120, 60, '50%'],
        ['Week 3', 90, 40, '44%'],
        ['Week 4', 150, 80, '53%']
      ]
    },
    performance: {
      headers: ['Metric', 'Value', 'Target', 'Achievement'],
      data: [
        ['Sales Revenue', '$58,000', '$50,000', '116%'],
        ['Lead Generation', '460', '400', '115%'],
        ['Conversion Rate', '48%', '45%', '107%'],
        ['Customer Satisfaction', '4.5/5', '4.0/5', '112%']
      ]
    }
  };

  useEffect(() => {
    const reportChart = echarts.init(document.getElementById('reportChart'));

    const getChartOptions = () => {
      switch (reportType) {
        case 'sales':
          return {
            title: { text: 'Sales Performance' },
            tooltip: { trigger: 'axis' },
            legend: { data: ['Revenue', 'Leads', 'Conversions'] },
            xAxis: {
              type: 'category',
              data: reportData.sales.data.map(row => row[0])
            },
            yAxis: [
              { type: 'value', name: 'Revenue' },
              { type: 'value', name: 'Count' }
            ],
            series: [
              {
                name: 'Revenue',
                type: 'bar',
                data: reportData.sales.data.map(row => row[1])
              },
              {
                name: 'Leads',
                type: 'line',
                yAxisIndex: 1,
                data: reportData.sales.data.map(row => row[2])
              },
              {
                name: 'Conversions',
                type: 'line',
                yAxisIndex: 1,
                data: reportData.sales.data.map(row => row[3])
              }
            ]
          };
        // Add cases for other report types...
        default:
          return {};
      }
    };

    reportChart.setOption(getChartOptions());

    return () => reportChart.dispose();
  }, [reportType, dateRange]);

  const generateCSV = () => {
    const data = reportData[reportType];
    const csvContent = [
      data.headers.join(','),
      ...data.data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportType}_report_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDF = () => {
    // Using browser's print functionality as a PDF generator
    const printContent = document.getElementById('reportContent');
    const printWindow = window.open('', '', 'height=600,width=800');

    printWindow.document.write('<html><head><title>Report</title>');
    // Add styles
    printWindow.document.write(`
      <style>
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        h1 { color: #333; }
      </style>
    `);
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="space-y-4" id="reportContent">
      {/* Report Configuration */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <select
              className="border rounded-lg px-4 py-2 bg-white"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="sales">Sales Report</option>
              <option value="leads">Leads Report</option>
              <option value="performance">Performance Report</option>
            </select>

            <select
              className="border rounded-lg px-4 py-2 bg-white"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              className="flex items-center px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <div className="relative inline-block">
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                  const dropdown = document.getElementById('exportDropdown');
                  dropdown.classList.toggle('hidden');
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <div
                id="exportDropdown"
                className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
              >
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-t-lg"
                  onClick={generatePDF}
                >
                  Export as PDF
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-b-lg"
                  onClick={generateCSV}
                >
                  Export as CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="products">Products</option>
                  <option value="services">Services</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Min Value</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                  value={filters.minValue}
                  onChange={(e) => setFilters({...filters, minValue: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Max Value</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                  value={filters.maxValue}
                  onChange={(e) => setFilters({...filters, maxValue: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report Preview */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Report Preview</h3>
        <div id="reportChart" className="h-96 w-full" />

        {/* Tabular Data */}
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {reportData[reportType].headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData[reportType].data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsGenerator;
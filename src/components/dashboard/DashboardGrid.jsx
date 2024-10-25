import React, { useState } from 'react';
import * as echarts from 'echarts';
import { Settings, Move } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

const DashboardGrid = () => {
  const { widgets, toggleWidget } = useDashboard();
  const [isCustomizing, setIsCustomizing] = useState(false);

  React.useEffect(() => {
    // Only initialize charts for enabled widgets
    widgets.forEach(widget => {
      if (widget.enabled) {
        if (widget.id === 'sales') {
          const salesChart = echarts.init(document.getElementById('salesChart'));
          salesChart.setOption({
            title: { text: 'Monthly Sales' },
            tooltip: { trigger: 'axis' },
            xAxis: {
              type: 'category',
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
            },
            yAxis: { type: 'value' },
            series: [{
              data: [150, 230, 224, 218, 135, 147],
              type: 'line',
              smooth: true,
              areaStyle: {}
            }]
          });
        }
        if (widget.id === 'leads') {
          const leadsChart = echarts.init(document.getElementById('leadsChart'));
          leadsChart.setOption({
            title: { text: 'Lead Sources' },
            tooltip: { trigger: 'item' },
            series: [{
              type: 'pie',
              radius: ['40%', '70%'],
              data: [
                { value: 235, name: 'Website' },
                { value: 274, name: 'Referral' },
                { value: 310, name: 'Social' }
              ]
            }]
          });
        }
      }
    });
  }, [widgets]);

  const WidgetControls = ({ widget }) => (
    <div className="absolute top-2 right-2 flex gap-2">
      {isCustomizing && (
        <button
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => toggleWidget(widget.id)}
        >
          {widget.enabled ? 'Disable' : 'Enable'}
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <button
          onClick={() => setIsCustomizing(!isCustomizing)}
          className="flex items-center px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          <Settings className="w-4 h-4 mr-2" />
          {isCustomizing ? 'Save Layout' : 'Customize Dashboard'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
        {/* Sales Widget */}
        {widgets.find(w => w.id === 'sales')?.enabled && (
          <div className="relative col-span-2 p-4 bg-white rounded-lg shadow-md">
            <WidgetControls widget={widgets.find(w => w.id === 'sales')} />
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <div id="salesChart" className="h-64" />
          </div>
        )}

        {/* Leads Widget */}
        {widgets.find(w => w.id === 'leads')?.enabled && (
          <div className="relative p-4 bg-white rounded-lg shadow-md">
            <WidgetControls widget={widgets.find(w => w.id === 'leads')} />
            <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>
            <div id="leadsChart" className="h-64" />
          </div>
        )}

        {/* Performance Widget */}
        {widgets.find(w => w.id === 'performance')?.enabled && (
          <div className="relative col-span-3 p-4 bg-white rounded-lg shadow-md">
            <WidgetControls widget={widgets.find(w => w.id === 'performance')} />
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Total Revenue</p>
                <p className="text-2xl font-bold">$24,500</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600">Conversion Rate</p>
                <p className="text-2xl font-bold">8.5%</p>
                <p className="text-sm text-green-600">+2.1% from last month</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">Active Leads</p>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-red-600">-5% from last month</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardGrid;
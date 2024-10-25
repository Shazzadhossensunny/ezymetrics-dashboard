import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Target } from 'lucide-react';
import * as echarts from 'echarts';

const Analytics = () => {
  React.useEffect(() => {
    // Conversion Funnel
    const funnelChart = echarts.init(document.getElementById('funnelChart'));
    funnelChart.setOption({
      title: {
        text: 'Conversion Funnel'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            { value: 1000, name: 'Visits' },
            { value: 800, name: 'Leads' },
            { value: 400, name: 'Opportunities' },
            { value: 150, name: 'Deals' }
          ]
        }
      ]
    });

    // Revenue Trend
    const trendChart = echarts.init(document.getElementById('trendChart'));
    trendChart.setOption({
      title: {
        text: 'Revenue Trend'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [15000, 18000, 22000, 20000, 25000, 28000],
          type: 'line',
          smooth: true,
          areaStyle: {}
        }
      ]
    });

    return () => {
      funnelChart.dispose();
      trendChart.dispose();
    };
  }, []);

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$128,500',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: '8.5%',
      change: '+2.1%',
      icon: Target,
      trend: 'up'
    },
    {
      title: 'Active Leads',
      value: '342',
      change: '-5%',
      icon: Users,
      trend: 'down'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className="flex items-center mt-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <metric.icon className="w-12 h-12 text-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div id="funnelChart" className="h-80 w-full" />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div id="trendChart" className="h-80 w-full" />
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Performance Breakdown</h3>
        <div className="space-y-4">
          {[
            { label: 'Lead Quality Score', value: 8.5, max: 10 },
            { label: 'Customer Acquisition Cost', value: 65, max: 100 },
            { label: 'Customer Lifetime Value', value: 82, max: 100 }
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span className="text-sm font-medium">
                  {stat.value}/{stat.max}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(stat.value / stat.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

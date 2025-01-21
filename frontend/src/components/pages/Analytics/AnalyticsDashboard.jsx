import React from 'react';
import { Line } from 'react-chartjs-2'; // Import Line chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Reusable MetricCard component
const MetricCard = ({ title, value, change, color }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-300 shadow-sm">
    <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
    <p className="text-3xl font-bold mb-2">{value}</p>
    <div className={`flex items-center ${color} text-sm`}>
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
      <span>{change} this month</span>
    </div>
  </div>
);

// Reusable ProgressBar component
const ProgressBar = ({ label, percentage, color }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}</span>
    <div className="w-2/3 bg-gray-200 rounded-full h-2">
      <div className={`h-2 rounded-full ${color}`} style={{ width: percentage }}></div>
    </div>
  </div>
);

// Dummy data for charts
const userGrowthData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'User Registrations',
      data: [50, 200, 150, 300, 500, 700],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

const matchSuccessRateData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Match Success Rate',
      data: [70, 85, 75, 90, 95, 100],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
    },
  ],
};

// Main AnalyticsDashboard component
const AnalyticsDashboard = () => {
  // Dummy data
  const metrics = [
    { title: 'Total Users', value: '24,892', change: '+12.5%', color: 'text-green-600' },
    { title: 'Active Talents', value: '1,256', change: '+8.3%', color: 'text-green-600' },
    { title: 'Successful Matches', value: '856', change: '+15.2%', color: 'text-green-600' },
    { title: 'Revenue', value: '$45,892', change: '-2.4%', color: 'text-red-600' },
  ];

  const demographics = [
    { label: 'Age 18-24', percentage: '45%', color: 'bg-blue-500' },
    { label: 'Age 25-34', percentage: '65%', color: 'bg-green-500' },
    { label: 'Age 35-44', percentage: '30%', color: 'bg-yellow-500' },
  ];

  const talents = [
    { label: 'Programming', value: '1,234' },
    { label: 'Design', value: '892' },
    { label: 'Marketing', value: '645' },
  ];

  const events = [
    { label: 'Online Events', percentage: '75%', color: 'bg-blue-500' },
    { label: 'Offline Events', percentage: '40%', color: 'bg-green-500' },
    { label: 'Workshops', percentage: '55%', color: 'bg-yellow-500' },
  ];

  return (
    <section id="analytics" className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">Analytics Dashboard</h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-300 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <Line data={userGrowthData} />
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-300 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Match Success Rate</h3>
            <Line data={matchSuccessRateData} />
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Demographics */}
          <div className="bg-white rounded-lg p-6 border border-gray-300 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">User Demographics</h3>
            <div className="space-y-4">
              {demographics.map((item, index) => (
                <ProgressBar key={index} {...item} />
              ))}
            </div>
          </div>

          {/* Popular Talents */}
          <div className="bg-white rounded-lg p-6 border border-gray-300 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Popular Talents</h3>
            <div className="space-y-4">
              {talents.map((talent, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{talent.label}</span>
                  <span className="text-blue-600">{talent.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Participation */}
          <div className="bg-white rounded-lg p-6 border border-gray-300 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Event Participation</h3>
            <div className="space-y-4">
              {events.map((event, index) => (
                <ProgressBar key={index} {...event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;

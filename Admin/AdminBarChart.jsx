import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const AdminBarChart = ({ data }) => {
  const chartData = {
    labels: ['Products', 'Users', 'Orders'],
    datasets: [
      {
        label: 'Count',
        data: data, // array like [50, 120, 30]
        backgroundColor: ['#4ade80', '#60a5fa', '#facc15'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: { display: false }, // optional
      title: { display: true, text: 'Platform Overview' },
    },
    scales: {
      y: { beginAtZero: true },
    },
    //  barThickness: 160, // Try 20, 30, 40 etc.
    // maxBarThickness: 80, 
     categoryPercentage: 0.5,  // 0.5 = 50% of category width
  barPercentage: 0.4,    
  };

  return <Bar data={chartData} options={options} />;
};

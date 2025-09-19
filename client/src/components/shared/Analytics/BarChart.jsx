// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.labels, // Months
    datasets: [
      {
        label: 'Income',
        data: data.income,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: data.expenses,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return(
    <>
      <div className='w-full flex items-center justify-center m-auto mt-5 md:mt-10 xl:w-4/5'>
        <Bar data={chartData} options={options} />
      </div>
    </>
  )
};

export default BarChart;

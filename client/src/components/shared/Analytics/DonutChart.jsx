// src/components/DonutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const DonutChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Expenses by Category',
        data: data.values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
  ];

  const totalExpense = data.values.reduce((a, b) => a + b, 0);

  return (

    <div className='flex flex-col sm:flex-row items-center justify-evenly mt-5 '>
      
      <div className=' w-4/5 sm:w-2/3 lg:w-2/5 '>
        <Doughnut data={chartData} />
      </div>

      <div className='flex flex-col justify-center w-4/5 sm:w-1/3 lg:w-1/2 mt-8 lg:mt-0 lg:ml-8'>
        {data.labels.map((label, index) => {
          const percentage = ((data.values[index] / totalExpense) * 100).toFixed(2);
          return (
            <div key={label} className='mb-4'>
              <div className='flex justify-between mb-1'>
                <span>{label}</span>
                <span>{percentage}%</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2.5'>
                <div
                  className='h-2.5 rounded-full'
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: colors[index % colors.length],
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default DonutChart;

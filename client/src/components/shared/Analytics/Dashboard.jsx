// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import DonutChart from './DonutChart';
import BarChart from './BarChart';

const Dashboard = () => {
  const { user } = useUser();
  const userId = user ? user.id : null;
  const [expenses, setExpenses] = useState([]);
  const [donutData, setDonutData] = useState({ labels: [], values: [] });
  const [barData, setBarData] = useState({ labels: [], income: [], expenses: [] });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (userId) {
      fetch(`${API_URL}/expense/${userId}`)
        .then(response => response.json())
        .then(data => {
          setExpenses(data);

          // Process data for Donut Chart (only expenses)
          const categories = data.reduce((acc, expense) => {
            if (expense.amount < 0) {
              acc[expense.category] = (acc[expense.category] || 0) + Math.abs(expense.amount);
            }
            return acc;
          }, {});

          setDonutData({
            labels: Object.keys(categories),
            values: Object.values(categories),
          });

          // Process data for Bar Chart (including all 12 months)
          const monthlyData = Array.from({ length: 12 }, (_, i) => ({
            income: 0,
            expenses: 0,
          }));

          data.forEach(expense => {
            const month = new Date(expense.date).getMonth(); // 0 (Jan) to 11 (Dec)
            if (expense.amount > 0) {
              monthlyData[month].income += expense.amount;
            } else {
              monthlyData[month].expenses += Math.abs(expense.amount);
            }
          });

          setBarData({
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            income: monthlyData.map(month => month.income),
            expenses: monthlyData.map(month => month.expenses),
          });
        });
    }
  }, [userId]);

  return (
    <div className='md:max-h-screen w-full md:w-screen pt-10 sm:p-8 md:p-12 overflow-y-auto bg-[whitesmoke]'>
      {/* <h1 className='text-left text-xl lg:text-2xl font-semibold lg:font-bold lg:tracking-wide pl-4 mb-5'>Expense Dashboard</h1>
      <hr></hr> */}
      <div className='flex flex-col justify-center lg:justify-between items-center'>

        <div className='mt-5 w-11/12 lg:w-[90%] bg-white rounded-xl sm:pt-7 pb-4 sm:p-10'>
          <h1 className='text-left font-semibold text-lg sm:text-xl md:text-2xl pt-4 pl-6 mb-4' > Categorized Expenses </h1>
          <hr></hr>
          <DonutChart data={donutData} />
        </div>

        <div className='my-5 md:mt-10 w-11/12 lg:w-[90%] bg-white rounded-xl pb-4 sm:pt-7 sm:p-10'>
          <h1 className='text-left font-semibold text-lg sm:text-xl md:text-2xl pt-4 pl-6 mb-4' > Categorized Expenses </h1>
          <hr></hr>
          <BarChart data={barData} />
        </div> 

      </div>
    </div>
  );
};

export default Dashboard;

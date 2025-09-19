// import React from 'react'
// import CurrentBalance from '@/assets/current-income.png'
// import MonthlyIncome from '@/assets/monthly-income.png'
// import TotalExpense from '@/assets/total-expense.png'
// import MonthlyExpense from '@/assets/monthly-expense.png'

// const Overview = () => {
//   return (
//     <div>
//         <h1 className='text-left pl-8 mt-16 text-2xl font-bold tracking-wide md:mt-8 lg:pl-16'> Overview </h1>
//         <div className='mt-6 px-3 mb-8 w-full flex flex-wrap justify-evenly gap-5 md:mt-6 lg:justify-evenly'>
//             <div className='expense-overview border-b-3 border-sky-600'> 
//                 <img src={CurrentBalance} className='w-8 lg:w-10'/>
//                 <div className='text-left'>
//                     <h3 className='font-bold text-sm md:text-base '>Current Balance</h3>
//                     <h1 className='text-base md:text-lg lg:text-xl'> ₹ 5,50,000 </h1>
//                 </div>
//             </div>
//             <div className='expense-overview border-b-3 border-green-600'> 
//                 <img src={MonthlyIncome} className='w-8 lg:w-10'/>
//                 <div className='text-left'>
//                     <h3 className='font-bold text-sm md:text-base '>Monthly Income</h3>
//                     <h1 className='text-base md:text-lg lg:text-xl'> ₹ 50,000 </h1>
//                 </div>
//             </div>
//             <div className='expense-overview border-b-3 border-red-600'>
//                 <img src={TotalExpense} className='w-8 lg:w-10'/>
//                 <div className='text-left'>
//                     <h3 className='font-bold text-sm md:text-base '>Total Expenses</h3>
//                     <h1 className='text-base md:text-lg lg:text-xl'> ₹ 2,80,000 </h1>
//                 </div>
//             </div>
//             <div className='expense-overview border-b-3 border-yellow-600'>
//                 <img src={MonthlyExpense} className='w-8 lg:w-10'/>
//                 <div className='text-left'>
//                     <h3 className='font-bold text-sm md:text-base '>Monthly Expenses</h3>
//                     <h1 className='text-base md:text-lg lg:text-xl'> ₹ 9,580 </h1>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Overview

import React, { useEffect, useState } from 'react';
import CurrentBalance from '@/assets/current-income.png';
import MonthlyIncome from '@/assets/monthly-income.png';
import TotalExpense from '@/assets/total-expense.png';
import MonthlyExpense from '@/assets/monthly-expense.png';
import { useUser } from '@clerk/clerk-react';

const Overview = () => {
    const { user } = useUser();
    if (!user) {
        return <div>Loading...</div>;
    }
    const userId = user.id;

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    // console.log(`API URL: ${API_URL}`);
    // const API_URL = import.meta.env.VITE_API_URL;

    const [currentBalance, setCurrentBalance] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [monthlyExpenses, setMonthlyExpenses] = useState(0);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${API_URL}/expense/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const expenses = await response.json();
                calculateValues(expenses);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, [userId]);

    const calculateValues = (expenses) => {
        let totalIncome = 0;
        let monthlyIncome = 0;
        let totalExpenses = 0;
        let monthlyExpenses = 0;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        expenses.forEach(expense => {
            const expenseDate = new Date(expense.date);
            const expenseMonth = expenseDate.getMonth();
            const expenseYear = expenseDate.getFullYear();
            const amount = expense.amount;

            if (amount > 0) {
                totalIncome += amount;
                if (expenseMonth === currentMonth && expenseYear === currentYear) {
                    monthlyIncome += amount;
                }
            } else {
                totalExpenses += Math.abs(amount);
                if (expenseMonth === currentMonth && expenseYear === currentYear) {
                    monthlyExpenses += Math.abs(amount);
                }
            }
        });

        setCurrentBalance(totalIncome - totalExpenses);
        setMonthlyIncome(monthlyIncome);
        setTotalExpenses(totalExpenses);
        setMonthlyExpenses(monthlyExpenses);
    };

    return (
        <div>
            <h1 className='text-left pl-8 mt-16 text-2xl font-bold tracking-wide md:mt-8 lg:pl-16'>Overview</h1>
            
            <div className='mt-6 px-3 mb-8 w-full flex flex-wrap justify-evenly gap-5 md:mt-6 lg:justify-evenly'>
            
                <div className='expense-overview border-b-3 border-sky-600' style={{ background: 'white' }} >
                    <img src={CurrentBalance} className='w-8 lg:w-10' />
                    <div className='text-left'>
                        <h3 className='font-bold text-sm md:text-base'>Current Balance</h3>
                        <h1 className='text-base md:text-lg lg:text-xl'>₹ {currentBalance}</h1>
                    </div>
                </div>
            
                <div className='expense-overview border-b-3 border-green-600' style={{ background: 'white' }} >
                    <img src={MonthlyIncome} className='w-8 lg:w-10' />
                    <div className='text-left'>
                        <h3 className='font-bold text-sm md:text-base'>Monthly Income</h3>
                        <h1 className='text-base md:text-lg lg:text-xl'>₹ {monthlyIncome}</h1>
                    </div>
                </div>
            
                <div className='expense-overview border-b-3 border-red-600' style={{ background: 'white' }} >
                    <img src={TotalExpense} className='w-8 lg:w-10' />
                    <div className='text-left'>
                        <h3 className='font-bold text-sm md:text-base'>Total Expenses</h3>
                        <h1 className='text-base md:text-lg lg:text-xl'>₹ {totalExpenses}</h1>
                    </div>
                </div>
            
                <div className='expense-overview border-b-3 border-yellow-600' style={{ background: 'white' }} >
                    <img src={MonthlyExpense} className='w-8 lg:w-10' />
                    <div className='text-left'>
                        <h3 className='font-bold text-sm md:text-base'>Monthly Expenses</h3>
                        <h1 className='text-base md:text-lg lg:text-xl'>₹ {monthlyExpenses}</h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Overview;

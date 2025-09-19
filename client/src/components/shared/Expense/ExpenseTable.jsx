import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import AddBefore from '@/assets/add-before.png';
import AddAfter from '@/assets/add-after.png';

import InputExpense from './InputExpense';
import ExpenseData from './ExpenseData';
import ExpenseDetails from './ExpenseDetails';
import ErrorPopup from './ErrorPopup';

const ExpenseTable = () => {
    const [isHovered, setIsHovered] = useState(false);

    const [selectedExpense, setSelectedExpense] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const { user } = useUser();

    const [errorPopup, setErrorPopup] = useState(false);

    
    useEffect(() => {
        if (user) {
            const userId = user.id;
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            // const API_URL = import.meta.env.VITE_API_URL;
            
            // READ FUNCTION 

            const fetchExpenses = async () => {
                try {
                    const response = await fetch(`${API_URL}/expense/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setExpenses(data);
                    } 
                    else {
                        setErrorPopup(true);
                        const timer = setTimeout(() => {
                            setErrorPopup(false);
                        }, 5000);
                        console.error('Failed to fetch expenses');
                    }
                } 
                
                catch (error) {
                    setErrorPopup(true);
                    const timer = setTimeout(() => {
                        setErrorPopup(false);
                    }, 5000);
                    console.error('Error:', error);
                }
            };

            fetchExpenses();
        }
    }, [user]);

    return (
        <div>

            <ErrorPopup showPopUp={errorPopup} />

            <div className='px-8 mt-3 flex justify-between lg:px-16'>
                <h1 className='text-2xl font-bold tracking-wide'>Transactions</h1>
                <Dialog>
                    <DialogTrigger
                        className='flex items-center justify-between gap-2 bg-slate-600 px-2 py-2 rounded text-white hover:bg-slate-800 transform hover:scale-105 hover:rounded-md md:px-4'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isHovered ? (
                            <img src={AddAfter} className='w-5 lg:w-7' />
                        ) : (
                            <img src={AddBefore} className='w-5 lg:w-7' />
                        )}
                        <h1 className='text-base lg:text-xl text-gray-200 hover:text-white'>Add</h1>
                    </DialogTrigger>
                    <DialogContent className='py-10'>
                        <DialogHeader>
                            <DialogTitle className='mb-4 px-2 pb-2 border-b-1 border-slate-300 lg:mx-4 lg:text-2xl'>Add Transaction</DialogTitle>
                            <DialogDescription>
                                <InputExpense />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className='overflow-y-auto'>
                <table className="w-[90%] mx-auto divide-y divide-gray-200 mt-6">
                    <thead className="bg-gray-200">
                        <tr className='text-center text-xs font-medium text-gray-500 uppercase tracking-wider lg:text-sm'>
                            <th scope="col" className="px-6 py-3 text-left w-[28%]">Expense Name</th>
                            <th scope="col" className="px-6 py-3 w-[18%]">Amount</th>
                            <th scope="col" className="px-6 py-3 w-[18%]">Category</th>
                            <th scope="col" className="px-6 py-3 w-[18%]">Date</th>
                            <th scope="col" className="px-6 py-3 text-right w-[18%]">Payment Method</th>
                        </tr>
                    </thead>
                    <ExpenseData expenses={expenses} onRowClick={setSelectedExpense} />
                </table>

                {selectedExpense && <ExpenseDetails expense={selectedExpense} onClose={() => setSelectedExpense(null)} />}
            </div>
        </div>
    );
};

export default ExpenseTable;

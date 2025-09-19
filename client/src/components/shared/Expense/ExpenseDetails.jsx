
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/clerk-react';

import CloseBtn from '@/assets/close.png';
import ErrorPopup from './ErrorPopup';
import Popup from './Popup';

const ExpenseDetails = ( { expense, onClose } ) => {
    // Extracting User id from Clerk
    const { user } = useUser();
    if (!user) {
        return <div>Loading...</div>;
    }
    const userId = user.id;

    // Creating states for input
    const [title, setTitle] = useState(expense.title);
    const [category, setCategory] = useState(expense.category);
    
    // Format the date to YYYY-MM-DD
    const formattedDate = new Date(expense.date).toISOString().split('T')[0];
    const [date, setDate] = useState(formattedDate);

    const [paymentMethod, setPaymentMethod] = useState(expense.paymentMethod);
    const [description, setDescription] = useState(expense.description);
    const [inputValue, setInputValue] = useState(expense.amount); // stores amount
    // const [isMinus, setIsMinus] = useState(true);
    const [isMinus, setIsMinus] = useState(expense.amount < 0); // Initialize based on amount

    const [popUp, setPopUp] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleClick = () => {
        // changing the state to change + to - and - to +
        setIsMinus(isMinus => !isMinus);

        // if input is not empty changing the sign of input value depending upon the button
        if (inputValue !== '') {
            setInputValue(prevValue => -prevValue);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (isMinus) {
            setInputValue(-Math.abs(value));
        }
    };

    // Edit Function
    const editExpense = async () => {

        const data = {
            title: title,
            amount: inputValue,
            category: category,
            date: date,
            paymentMethod: paymentMethod,
            description: description,
            user: userId
        };

        try {
            const response = await fetch(`${API_URL}/expense/${expense._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (!response.ok) {
                setErrorPopup(true);
                const timer = setTimeout(() => {
                    setErrorPopup(false);
                }, 5000);
                const errorData = await response.json();
                throw new Error(`Failed to edit expense: ${errorData.message}`);
            }

            const responseData = await response.json();
            console.log(responseData);

            // Refresh the page after successful edit
            setPopUp(true);
            const timer = setTimeout(() => {
                setPopUp(false);
                window.location.reload();
            }, 2500);
        } 
        
        catch (error) {
            setErrorPopup(true);
            const timer = setTimeout(() => {
                setErrorPopup(false);
            }, 5000);
            console.error('Error:', error);
        }
    };

    // DELETE FUNCTION 
    const deleteExpense = async () => {
        try {
            const response = await fetch(`${API_URL}/expense/${expense._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                setErrorPopup(true);
                const timer = setTimeout(() => {
                    setErrorPopup(false);
                }, 5000);
                const errorData = await response.json();
                throw new Error(`Failed to delete expense: ${errorData.message}`);
            }

            const responseData = await response.json();
            console.log(responseData);
            
            setPopUp(true);
            const timer = setTimeout(() => {
                setPopUp(false);
                window.location.reload();
            }, 2500);
        } 
        catch (error) {
            setErrorPopup(true);
            const timer = setTimeout(() => {
                setErrorPopup(false);
            }, 5000);
            console.error('Error:', error);
        }
    };


    return (
        <>
            <div className='absolute top-[5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10'>
                <Popup showPopUp={popUp} />
                <ErrorPopup showPopUp={errorPopup} />
            </div>

            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">

                    <div className='flex justify-between items-center'>
                        <h1 className='px-2 lg:mx-4 font-semibold text-xl lg:text-2xl'> Edit Transaction </h1>
                        <button onClick={onClose} className=''>
                            <img src={CloseBtn} className='w-6'/>
                        </button>
                    </div>

                    <div className='border-b-1 border-slate-300 m-4 '></div>
                
                    <div className='mx-8 text-slate-600'>
                        <div >

                            <div className='flex flex-col items-start mb-3 hover:text-black'>
                                <h1 className='form-heading'> Expense Title </h1>
                                <Input className='form-input' 
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            <div className='flex mb-3'>
                                <div className='flex flex-col items-start mb-3 hover:text-black'>
                                    <h1 className='form-heading'> Amount </h1>
                                    <div className='flex items-center gap-2'>
                                        <button className={`w-8 h-8 pb-1 rounded flex items-center justify-center text-2xl text-center lg:pb-2 lg:text-3xl
                                                    ${isMinus ? ' bg-red-100 border-1 text-red-600 border-red-600' 
                                                            : ' bg-green-100 border-1 text-green-600 border-green-600'}` }
                                            onClick={handleClick}
                                            type='button'
                                            >
                                            {isMinus ? '-' : '+'}
                                        </button>
                                        <Input
                                            type='number'
                                            className={`w-[60%] focus:text-black tracking-wider border-1 focus:border-none lg:text-base
                                                    ${isMinus ? 'text-red-600 border-red-400 ' : 'text-green-600 border-green-400 '}`}
                                            value={inputValue}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col items-start mb-3 hover:text-black'>
                                    <h1 className='form-heading'> Category </h1>
                                    <Input className='form-input'
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='flex items-center gap-4 mb-6 hover:text-black'>
                                <h1 className='tracking-wide font-semibold lg:text-[17px]'> Date : </h1>
                                <input type="date" 
                                    className="focus:outline-none ring-1 ring-gray-300 p-1 rounded-md lg:text-base"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>

                            <div className='flex flex-col items-start mb-3 hover:text-black'>
                                <h1 className='form-heading pb-1'> Payment Method </h1>
                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className='flex items-start gap-10'>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <RadioGroupItem value="cash" id="cash" />
                                            <Label htmlFor="cash" className='lg:text-base'> Cash </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <RadioGroupItem value="online" id="online" />
                                            <Label htmlFor="online" className='lg:text-base'> Online </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <RadioGroupItem value="card" id="card" />
                                            <Label htmlFor="card" className='lg:text-base'> Card </Label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <RadioGroupItem value="crypto" id="crypto" />
                                            <Label htmlFor="crypto" className='lg:text-base'> Crypto </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <RadioGroupItem value="cheque" id="cheque" />
                                            <Label htmlFor="cheque" className='lg:text-base'> Cheque </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <RadioGroupItem value="transfer" id="transfer" />
                                            <Label htmlFor="transfer" className='lg:text-base'> Bank Transfer </Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className='flex flex-col items-start mb-5 hover:text-black'>
                                <h1 className='form-heading'> Description </h1>
                                <Textarea className='form-input'
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            {/* <div className='flex justify-end'>
                                <Button type='submit' className='bg-sky-500 hover:bg-sky-600 tracking-wide transform hover:scale-105'> SAVE </Button>
                            </div> */}
                            <div className='flex justify-evenly items-center'>
                                <button onClick={editExpense} className="mt-4 bg-green-500 w-[75px] text-white py-2 px-4 rounded hover:bg-green-00"> Edit </button>
                                <button onClick={deleteExpense} className="mt-4 bg-red-500 w-[75px] text-white py-2 px-4 rounded hover:bg-red-600"> Delete </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ExpenseDetails;

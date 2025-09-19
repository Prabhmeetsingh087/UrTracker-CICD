import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/clerk-react';
import ErrorPopup from './ErrorPopup';
import Popup from './Popup';

const InputExpense = () => {
    // Extracting User id from Clerk
    const { user } = useUser();
    if (!user) {
        return <div>Loading...</div>;
    }
    const userId = user.id;

    // Creating states for input
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [description, setDescription] = useState('');
    const [isMinus, setIsMinus] = useState(true);
    const [inputValue, setInputValue] = useState(''); 
    
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

    // CREATE EXPENSE 

    const addExpense = async (e) => {
        e.preventDefault();

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
            const response = await fetch(`${API_URL}/expense`, {
                method: 'POST',
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
                throw new Error(`Failed to add expense: ${errorData.message}`);
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
    }

    return (
        <>
            <div className=' absolute top-[-25px] left-24 '>
                <Popup showPopUp={popUp} />
            </div>
            <ErrorPopup showPopUp={errorPopup} />

            <div className='mx-8 text-slate-600'>


                <form onSubmit={addExpense}>
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

                    <div className='flex justify-end'>
                        <Button type='submit' className='bg-sky-500 hover:bg-sky-600 tracking-wide transform hover:scale-105'> SAVE </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default InputExpense;

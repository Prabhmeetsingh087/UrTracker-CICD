import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import Logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
  

const Sidebar = () => {
  return (
    <>
      {/* MOBILE VIEW  */}
      <div className='md:hidden' >
        <Sheet>
            <SheetTrigger className='-mt-4'> 
              <div className='w-full bg-slate-900 flex justify-end absolute top-0 left-0 p-4 gap-2'>
                <img className='w-7' src={Logo} alt='Icon' />
                <h1 className='font-bold text-xl text-white'> UrTracker </h1>
              </div>
            </SheetTrigger>
            <SheetContent>
                {/* <SheetHeader>
                <SheetTitle> Expenses </SheetTitle>
                <SheetDescription> This action cannot be undone. </SheetDescription>
                </SheetHeader> */}
                <div className='flex justify-center mx-auto my-4 gap-2'>
                  <img className='w-8' src={Logo} alt='Icon' />
                  <h1 className='font-bold text-2xl'> UrTracker </h1>
                </div>
                <div className='flex flex-col justify-between h-[85vh]'>
                  <div className='flex flex-col mx-4 text-center'>
                    <Link to='/home' className='text-slate-500 text-lg border-b-2 border-y-gray-100 p-4 hover:text-slate-900 hover:border-y-gray-200'> Home </Link>
                    <Link to='/expense' className='text-slate-500 text-lg border-b-2 border-y-gray-100 p-4 hover:text-slate-900 hover:border-y-gray-200'> Expense </Link>
                    <Link to='/dashboard' className='text-slate-500 text-lg border-y-gray-100 p-4 hover:text-slate-900'> Dashboard </Link>
                  </div>
                  <div>
                    {/* <SignedOut>
                      <div className='w-fit mx-auto text-white bg-gray-600 rounded px-4 py-2 border-[1px] border-gray-800 hover:border-gray-400 hover:bg-gray-700'>
                        <SignInButton />
                      </div>
                    </SignedOut> */}
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </div>
                </div>
            </SheetContent>
        </Sheet>
      </div>


      {/* LARGER SCREEN  */}
      <div className='hidden md:visible md:flex md:flex-col h-screen bg-slate-800 md:w-1/4 lg:w-1/6'>

        <div className='flex items-center mx-auto my-8 gap-2 lg:gap-4'>
          <img className='w-6 h-6  xl:w-8 xl:h-8' src={Logo} alt='Icon' />
          <h1 className='font-mono text-xl md:text-xl text-white xl:text-2xl'> UrTracker </h1>
        </div>

        <div className='flex flex-col justify-between h-full m-4 -mt-4'>
          <div className='flex flex-col'>
            <Link to='/home' className='text-gray-300 text-lg border-b-2 border-y-slate-700 p-4 hover:text-white hover:border-y-slate-600 md:text-xl'> Home </Link>
            <Link to='/expense' className='text-gray-300 text-lg border-b-2 border-y-slate-700 p-4 hover:text-white hover:border-y-slate-600 md:text-xl'> Expense</Link>
            <Link to='/dashboard' className='text-gray-300 text-lg border-y-slate-700 p-4 hover:text-white md:text-xl'> Dashboard </Link>
          </div>

          <div>
            {/* <SignedOut>
              <div className='w-fit mx-auto text-white bg-gray-600 rounded px-4 py-2 border-[1px] border-gray-800 hover:border-gray-400 hover:bg-gray-700'>
                <SignInButton />
              </div>
            </SignedOut> */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

        </div>
      </div>
    </>
  )
}

export default Sidebar
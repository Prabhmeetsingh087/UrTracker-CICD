import React from 'react'
import Overview from './Overview'
import ExpenseTable from './ExpenseTable'

const Expense = () => { 
  return (
    <>
      <div className='flex flex-col pb-8 bg-[whitesmoke] md:w-[75%] lg:w-[84%] md:overscroll-contain md:max-h-screen md:overflow-scroll md:overflow-x-auto w-full' >
        <Overview />
        <ExpenseTable />
      </div>
    </>
  )
}

export default Expense
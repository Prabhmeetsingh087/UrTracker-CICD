import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

const Layout = () => {
  return (
    <>
      <SignedOut>
        <div className='flex justify-center items-center h-screen'>
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn> 
        <div className=' md:flex '>
          <Sidebar />
          {/* <div className='overscroll-contain max-h-screen overflow-scroll overflow-x-auto w-full'> */}
            <Outlet />
          {/* </div> */}
        </div>
      </SignedIn>
    </>
  )
}

export default Layout
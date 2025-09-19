import React from 'react'

const ErrorPopup = ( {showPopUp} ) => {
  return (
    <div className={` ${showPopUp ? 'block' : 'hidden'} flex justify-center items-center absolute top-[-25px] left-1/4 text-xl tracking-wider rounded-md w-60 h-12 border-2 border-red-600 bg-red-500 text-white`}>
        ⚠  Error : try again !
    </div>
  )
}

export default ErrorPopup
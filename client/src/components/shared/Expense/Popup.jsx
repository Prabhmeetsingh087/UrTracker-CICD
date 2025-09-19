import React from 'react'

const Popup = ( {showPopUp} ) => {

    return (
        <div className={` ${showPopUp ? 'block' : 'hidden'} flex justify-center items-center text-xl tracking-wider rounded-md w-80 h-12 border-2 border-green-600 bg-green-500 text-white`}>
            🎉 Action successfully taken !
        </div>
    )
}

export default Popup
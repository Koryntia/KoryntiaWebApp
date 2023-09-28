import React from 'react'

interface ButtonProps {
    title: string
}

const LoanButton = ({title}: ButtonProps) => {
  return (
    <div className='flex justify-center'>
        <button className='bg-appColor1 
        rounded-xl
        py-2 px-3
        w-72 
        text-center text-white'
        >{title}</button>
    </div>
  )
}

export default LoanButton
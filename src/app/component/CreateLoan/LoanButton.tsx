import React, { Dispatch, SetStateAction } from 'react'

interface ButtonProps {
  title: string,
  showSummary: boolean;
  setShowSummary: Dispatch<SetStateAction<boolean>>;
  handleShowSummary: () => void;
}


const LoanButton = ({
  title,
  showSummary,
  setShowSummary,
  handleShowSummary }: ButtonProps) => {
  return (
    <div className='flex justify-center'>
      <button className='bg-appColor1 
        rounded-xl
        py-2 px-3
        w-72 
        text-center text-white'
        onClick={handleShowSummary}
      >{title}</button>
    </div>
  )
}

export default LoanButton
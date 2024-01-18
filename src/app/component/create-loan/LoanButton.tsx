import React, { Dispatch, SetStateAction } from "react";

interface ButtonShowProps {
  disabledButton: boolean;
  title: string;
  showSummary: boolean;
  setShowSummary: Dispatch<SetStateAction<boolean>>;
  handleShowSummary: () => void;
}

const LoanButton = ({
  disabledButton,
  title,
  showSummary,
  setShowSummary,
  handleShowSummary,
}: ButtonShowProps) => {
  return (
    <button
      disabled={disabledButton}
      className={`
      ${disabledButton === true ? "bg-gray-400 opacity-70" : "bg-appColor1"} 
      rounded-xl
      py-2 px-3
      w-72 
      text-center text-white`}
      onClick={handleShowSummary}
    >
      {title}
    </button>
  );
};

export default LoanButton;

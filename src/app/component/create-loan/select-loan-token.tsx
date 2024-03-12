import React from "react";

type SelectTokenProps = {
  options: { name: string; tokenAddress: any }[];
  handleChange: (e: any) => void;
  formValues: string;
};

const SelectLoanToken: React.FC<SelectTokenProps> = ({
  options,
  handleChange,
  formValues,
}) => {
  return (
    <select
      className="bg-slate-100 h-10 cursor-pointer"
      name="loanAmountToken"
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.tokenAddress} value={option.tokenAddress}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectLoanToken;

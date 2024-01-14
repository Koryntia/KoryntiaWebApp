import React from "react";

type SelectCollateralTokenProps = {
  options: { name: string; tokenAddress: any }[];
  handleChange: (e: any) => void;
  formValues: string;
};

const SelectCollateralToken: React.FC<SelectCollateralTokenProps> = ({
  options,
  handleChange,
  formValues,
}) => {
  return (
    <select
      className="bg-slate-100 h-10 cursor-pointer"
      name="collateralAmountToken"
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

export default SelectCollateralToken;

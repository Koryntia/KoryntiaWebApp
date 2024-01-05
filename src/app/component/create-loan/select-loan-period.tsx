import React from "react";

type SelectLoanPeriodProps = {
  selectedValue: string;
  handleSelectChange: (value: string) => void;
  options: number[];
};

const SelectLoanPeriod: React.FC<SelectLoanPeriodProps> = ({
  selectedValue,
  handleSelectChange,
  options,
}) => {
  return (
    <select
      className="bg-slate-100 h-10 cursor-pointer"
      value={selectedValue}
      onChange={(event) => handleSelectChange(event.target.value)}
    >
      {options.map((value) => (
        <option key={value} value={value.toString()}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default SelectLoanPeriod;

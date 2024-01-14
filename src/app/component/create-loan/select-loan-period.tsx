import React from "react";

type CalculatePeriodFunction = (period: number) => void;

type SelectLoanPeriodProps = {
  options: number[];
  handleChange: (e: any) => void;
  formValues: number;
  calculatePeriod: CalculatePeriodFunction;
};

const SelectLoanPeriod: React.FC<SelectLoanPeriodProps> = ({
  handleChange,
  options,
  formValues,
  calculatePeriod,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    calculatePeriod(Number(e.target.value));
  };

  return (
    <select
      className="bg-slate-100 h-10 cursor-pointer"
      value={formValues}
      onChange={handleSelectChange}
      // onChange={handleChange}
      name="loanPeriod"
    >
      {options.map((value) => (
        <option key={value} value={Number(value)}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default SelectLoanPeriod;

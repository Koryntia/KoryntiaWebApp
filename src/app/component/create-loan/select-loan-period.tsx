import React from "react";

type CalculatePeriodFunction = (period: number) => void;

type SelectLoanPeriodProps = {
  options: { label: string; value: number }[];
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
      name="loanPeriod"
    >
      {options.map((item) => (
        <option key={item.value} value={Number(item.value)}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default SelectLoanPeriod;

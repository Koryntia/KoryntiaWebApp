import React from "react";

type SelectTokenProps = {
  options: { value: string; token: string }[];
  handleChange: (e: any) => void;
  formValues: string;
};

const SelectToken: React.FC<SelectTokenProps> = ({
  options,
  handleChange,
  formValues,
}) => {
  return (
    <select
      className="bg-slate-100 h-10 cursor-pointer"
      name={formValues}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.token}
        </option>
      ))}
    </select>
  );
};

export default SelectToken;

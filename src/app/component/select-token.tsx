import React from "react";

type SelectTokenProps = {
  options: { value: string; token: string }[];
};

const SelectToken: React.FC<SelectTokenProps> = ({ options }) => {
  return (
    <select className="bg-slate-100 h-10 cursor-pointer">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.token}
        </option>
      ))}
    </select>
  );
};

export default SelectToken;

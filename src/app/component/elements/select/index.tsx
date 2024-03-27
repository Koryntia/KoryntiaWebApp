import React from "react";
import { SelectProps } from "@/types/select";

function Select({ name, id, className, options, onChange }: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      name={name}
      id={id}
      className={`block w-full text-sm bg-transparent appearance-none  focus:outline-none focus:ring-0 peer ${className}`}
      onChange={handleChange}
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.name}
        </option>
      ))}
    </select>
  );
}

export default Select;

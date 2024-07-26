import React from "react";
import { SelectProps } from "@/types/select";
import { Select as SelectComponent } from "antd";

function Select({ name, id, className, options, onChange }: SelectProps) {
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
    onChange(value[0]);
  };
  return (
    <SelectComponent
      id={id}
      size="large"
      className={`block w-[100px] text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer ${className}`}
      onChange={handleChange}
    >
      {name}
      {options.map((item, index) => {
        return (
          <SelectComponent.Option key={index} value={item.value}>
            <div key={index} className="flex gap-2 items-center">
              <p className="capitalize">{item.name}</p>
            </div>
          </SelectComponent.Option>
        )
      })}
    </SelectComponent>
  );
}

export default Select;

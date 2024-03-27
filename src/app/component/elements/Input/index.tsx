import { InputProps } from "@/types/input";

export const Input = ({ type, name, placeholder, className }: InputProps) => {
  return (
    <input
      type={type || `text`}
      name={name}
      placeholder={placeholder}
      className={`border rounded px-2 py-1 flex-1 ${className}`}
    />
  );
};

export const RoundedInput = ({
  type,
  name,
  placeholder,
  className,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type || `text`}
      name={name}
      placeholder={placeholder}
      className={`text-textBlack bg-transparent border border-transparent w-[55%] focus:outline-none ${className}`}
      value={value || ""}
      onChange={onChange}
    />
  );
};

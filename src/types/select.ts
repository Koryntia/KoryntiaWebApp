export type SelectProps = {
  name: string;
  id: string;
  className?: string;
  options: { value: string; name: string }[];
  onChange: (selectedValue: string) => void;
};

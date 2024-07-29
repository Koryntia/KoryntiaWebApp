export type SelectProps = {
  name: string;
  id: string;
  className?: string;
  options: { value: string; name?: string; image?: string }[];
  onChange: (selectedValue: string) => void;
};

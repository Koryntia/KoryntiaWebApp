export type InputProps = {
  type?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value?: string | number | Date | any | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

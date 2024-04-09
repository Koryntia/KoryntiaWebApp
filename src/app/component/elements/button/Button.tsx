import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "solid-purple" | "solid-white" | "outlined" | string;
  styling?: string;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  styling,
  isDisabled,
  onClick,
}) => {
  const btnVariantClass = getVariantClass(variant);

  return (
    <button
      disabled={isDisabled}
      className={`w-full disabled:cursor-not-allowed disabled:grayscale btn font-inter cursor-pointer rounded-lg ${styling} ${btnVariantClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

const getVariantClass = (variant: string) => {
  switch (variant) {
    case "solid-purple":
      return "bg-appColor1 hover:bg-white hover:text-appColor1 hover:shadow-lg duration-500 text-whiteFFF";
    case "solid-white":
      return "bg-whiteFFF";
    case "outlined":
      return "bg-blue-100 text-blue-500";
    default:
      return ""; // Default styles
  }
};

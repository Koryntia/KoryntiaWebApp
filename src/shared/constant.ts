import { requestAmountOptions } from "@/app/data/currency";

export const baseUrl: string = "http://localhost:3000";

export const getImage = (token: string) => {
  const selectedOption = requestAmountOptions.find(
    (option) => option.name.toLowerCase() === token.toLowerCase()
  );
  return selectedOption ? selectedOption.image : "";
};

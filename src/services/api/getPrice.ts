import { get } from "../utils";

interface Price {
  token: string;
  price: number;
}

export const getPriceApi = async (tokenPair: string) => {
  return (
    await get<Price>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/get-price?tokenPair=${tokenPair}`
    )
  ).data;
};

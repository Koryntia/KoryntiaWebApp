import { get } from "../utils";

interface Price {
   token: string;
   price: number;
}

export const getPriceApi = async (tokenPair: string) => {
   return (await get<Price>(`/get-price?tokenPair=${tokenPair}`)).data;
};

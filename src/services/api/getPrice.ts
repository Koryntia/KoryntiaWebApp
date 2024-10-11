import { getTokenAddress } from "@/constant/tokens";
import { getTokenPrice } from './oracle';

interface Price {
  token: string;
  price: number;
}

export const getPriceApi = async (tokenPair: string) => {
  const tokenAddress = getTokenAddress(tokenPair.toUpperCase());
  
  return (
    {price: await getTokenPrice(tokenAddress as string), token: tokenAddress}
  );
};

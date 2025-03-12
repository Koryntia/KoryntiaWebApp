import { test_config } from "@/utils/config";
import { getTokenPrice } from '@/services/api/oracle';

const tokenAddress = test_config.TOKEN_A; // Replace with the token address you want to query
getTokenPrice(tokenAddress as string)
  .then(price => {
    console.log('Token Price:', price);
  })
  .catch(error => {
    console.error('Error:', error);
  });
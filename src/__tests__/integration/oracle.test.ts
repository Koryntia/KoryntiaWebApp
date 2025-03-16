import config, { test_config } from "@/utils/config";
import { getTokenPrice } from '@/services/api/oracle';

describe('getTokenPrice', () => {
  it.only('should return the price of a token', async () => {
    const tokenAddress = test_config.TOKEN_A;
    const price = await getTokenPrice(tokenAddress as string);

    expect(price).toBeDefined();
    expect(typeof price).toBe('number');
  });

  it('should handle errors gracefully', async () => {
    const invalidTokenAddress = '0xInvalidAddress';
    const price = await getTokenPrice(invalidTokenAddress);

    expect(price).toBeNull();
  });
});
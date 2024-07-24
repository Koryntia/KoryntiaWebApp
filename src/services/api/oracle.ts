import { ethers } from "ethers";
import oracleABI from "@/abis/oracle";
import config from "@/utils/config";

export async function getTokenPrice(tokenAddress: string): Promise<number> {
   try {
      let provider: ethers.Provider = new ethers.JsonRpcProvider(config.RPC_URL);

      if (!config.ORACLE_CONTRACT_ADDRESS) return 0;

      const oracleContract = new ethers.Contract(config.ORACLE_CONTRACT_ADDRESS, oracleABI, provider);

      const [, price] = await oracleContract.getPrice(tokenAddress);
      return Number(ethers.formatUnits(price, 8));
   } catch (error) {
      console.error("Error getting token price:", error);
      throw error;
   }
}

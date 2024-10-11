import { ethers } from "ethers";
import OracleABI from '@/abis/Oracle.json';
import config from "@/utils/config";
import MessageHandler from '@/utils/message-handler';

export async function getTokenPrice(tokenAddress: string): Promise<number | null> {
   try {
      const provider: ethers.Provider = new ethers.JsonRpcProvider(config.RPC_URL);
      if (!config.ORACLE_CONTRACT_ADDRESS) return 0;

      const oracleContract = new ethers.Contract(config.ORACLE_CONTRACT_ADDRESS, OracleABI, provider);

      const [, price] = await oracleContract.getPrice(tokenAddress);
      return Number(ethers.formatUnits(price, 8));
   } catch (error) {
      console.log(error);
      MessageHandler.get().handleError((error as Error).message);
      return null;
   }
}
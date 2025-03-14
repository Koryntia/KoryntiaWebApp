import { ethers } from "ethers";
import OracleABI from '@/abis/Oracle.json';
import MessageHandler from '@/utils/message-handler';
import config from "@/utils/config";

export async function getTokenPrice(tokenAddress: string): Promise<number | null> {
  try {
    const provider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider(config.RPC_URL);
    console.log("oracle address: ", config.ORACLE_CONTRACT_ADDRESS);
    
    if (!config.ORACLE_CONTRACT_ADDRESS) return 0;

    const oracleContract = new ethers.Contract(
      config.ORACLE_CONTRACT_ADDRESS,
      OracleABI,
      provider
    );
    console.log('oracle contract: ', oracleContract)

    const [, price] = await oracleContract.getPrice(tokenAddress);
    return Number(ethers.formatUnits(price, 8)); // Adjust decimals if needed
  } catch (error) {
    console.error('Error fetching token price:', error);
    MessageHandler.get().handleError((error as Error).message);
    return null;
  }
}
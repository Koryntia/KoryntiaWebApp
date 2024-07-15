import { ethers } from "ethers";
import oracleABI from "@/abis/oracle";
import config from "@/utils/config";

export async function getTokenPrice(tokenAddress: string): Promise<number> {
  try {
    let provider: ethers.providers.Provider =
      new ethers.providers.JsonRpcProvider(config.RPC_URL);
    let signer: ethers.Signer = new ethers.Wallet(config.PRIVATE_KEY, provider);

    const oracleContract = new ethers.Contract(
      config.ORACLE_CONTRACT_ADDRESS,
      oracleABI,
      signer,
    );
    const [, price] = await oracleContract.getPrice(tokenAddress);
    return Number(ethers.utils.formatUnits(price, 8));
  } catch (error) {
    console.error("Error getting token price:", error);
    throw error;
  }
}

import { ethers } from "ethers";
import OracleABI from '@/abis/Oracle.json';
import MessageHandler from '@/utils/message-handler';
import config from "@/utils/config";

const ExampleABI = [
  "constructor(address[] _initialAllowedAddresses)",
  "error StalePrice()",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
  "function addNewToken(address _tokenAddress, address _priceFeed)",
  "function addPriceFeedAddress(address _newAddress)",
  "function deletePriceFeedAddress(address _addressToDelete)",
  "function getPrice(address _tokenAddress) view returns (uint80, int256, uint256, uint256, uint80)",
  "function getTimeout(address) pure returns (uint256)",
  "function isAllowedToken(address _tokenAddress) view returns (bool)",
  "function isPriceFeedEmpty() view returns (bool)",
  "function owner() view returns (address)",
  "function renounceOwnership()",
  "function transferOwnership(address newOwner)"
];

export async function getTokenPrice(tokenAddress: string): Promise<number | null> {
  try {
    const provider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider(config.RPC_URL);
    console.log(config.ORACLE_CONTRACT_ADDRESS);
    
    if (!config.ORACLE_CONTRACT_ADDRESS) return 0;

    const oracleContract = new ethers.Contract(config.ORACLE_CONTRACT_ADDRESS, ExampleABI, provider);

    const [, price] = await oracleContract.getPrice(tokenAddress);
    return Number(ethers.formatUnits(price, 8)); // Adjust decimals if needed
  } catch (error) {
    console.error('Error fetching token price:', error);
    MessageHandler.get().handleError((error as Error).message);
    return null;
  }
}
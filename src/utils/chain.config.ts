import { Chain } from 'wagmi/chains'; // Correct import
import config from './config';

export const AppChain: Chain = {
  id: parseInt(config.NETWORK_ID as string, 10), 
  name: config.CHAIN_NAME as string,
  nativeCurrency: {
    name: 'Ether', 
    symbol: 'ETH', 
    decimals: 18, 
  },
  rpcUrls: {
    public: { http: [config.RPC_URL as string] }, 
    default: { http: [config.RPC_URL as string] },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan', // Replace with the correct block explorer name
      url: 'https://sepolia.etherscan.io', // Replace with the correct block explorer URL
    },
  },
  testnet: true, // Set to true if this is a testnet
};
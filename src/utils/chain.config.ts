import { Chain } from 'wagmi'
import config from './config';

export const AppChain: Chain = {
  id: Number(config.NETWORK_ID),
  name: config.CHAIN_NAME as string,
  network: process.env.NEXT_PUBLIC_NETWORK_NAME as string,
  rpcUrls: {
    public: { http: [config.RPC_URL as string] },
    default: { http: [config.RPC_URL as string] },
  },
}
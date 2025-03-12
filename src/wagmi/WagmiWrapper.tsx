"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cookieStorage, createStorage, WagmiProvider } from "wagmi";
import { http, createConfig } from "wagmi";
import { Chain } from 'wagmi/chains'; // Correct import
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { AppChain } from '@/utils/chain.config';

// Set up a React Query client
const queryClient = new QueryClient();

const projectId = "72e903acf981adea13f91954e54f4727";

export const config = createConfig({
  chains: [AppChain],
  connectors: [
    injected(),
    metaMask({
      dappMetadata: {
        name: "Koryntia",
        url: 'https://app.koryntia.finance'
      }
    }),
    safe(),
    walletConnect({
      projectId: projectId
    })
  ],
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  transports: {
    [AppChain.id]: http(),
  },
});

type Props = {
  children: ReactNode;
};

const WagmiWrapper = ({ children }: Props) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiWrapper;
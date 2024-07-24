"use client";
import React, { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cookieStorage, createStorage, WagmiProvider } from "wagmi";

// 2. Set up a React Query client.
const queryClient = new QueryClient();

import { http, createConfig } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = "18f45d4c6ab419ec257168ecbc48df46";

export const config = createConfig({
  chains: [mainnet, base],
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
    [mainnet.id]: http(),
    [base.id]: http(),
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

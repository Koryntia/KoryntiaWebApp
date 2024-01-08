"use client";
import React, { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

// 2. Set up a React Query client.
const queryClient = new QueryClient();

import { http, createConfig } from "wagmi";
import { base, mainnet, optimism } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = "18f45d4c6ab419ec257168ecbc48df46";

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [injected(), metaMask(), safe()],
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

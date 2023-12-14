'use client'
import { InjectedConnector } from '@wagmi/core'
import React, { ReactNode } from 'react'
import { avalanche, avalancheFuji, goerli, sepolia } from 'viem/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, avalanche, avalancheFuji, sepolia, goerli ],
    [alchemyProvider({ apiKey: 'aaogtsr8AWUFzYWjNFEBkM96-wweAWZM' }), publicProvider()],
)

const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: '...',
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
    ],
    publicClient,
    webSocketPublicClient,
})

type Props = {
    children: ReactNode;
};

const WagmiProvider = ({ children }: Props) => {
    return (
        <WagmiConfig config={config}>
            {children}
        </WagmiConfig>
    )
}

export default WagmiProvider
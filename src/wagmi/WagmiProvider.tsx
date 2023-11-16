'use client'
import { InjectedConnector } from '@wagmi/core'
import React, { ReactNode } from 'react'
import { avalanche, avalancheFuji } from 'viem/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, avalanche, avalancheFuji],
    [alchemyProvider({ apiKey: 'PmmE67Wr9Td19p4wcOSZBKimpM5k2-4G' }), publicProvider()],
)

// PmmE67Wr9Td19p4wcOSZBKimpM5k2-4G

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
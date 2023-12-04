'use client'
import { configureChains, createConfig, mainnet } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { avalanche, avalancheFuji } from 'viem/chains'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, avalanche, avalancheFuji],
	[alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
)

// Set up wagmi config
const config = createConfig({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),

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

export default config

import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, optimism, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

const projectId = "18f45d4c6ab419ec257168ecbc48df46";

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia, optimism],
    connectors: [
      injected(),
      walletConnect({
        projectId: projectId,
      }),
      metaMask({
        dappMetadata: {
          name: "Koryntia",
          url: "https://koryntia.finance",
        },
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [optimism.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}

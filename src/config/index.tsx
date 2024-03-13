// import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createConfig, createStorage, http } from "wagmi";
// import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect } from "wagmi/connectors";
import { customChain } from "./customChain";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  console.error("Please set NEXT_PUBLIC_PROJECT_ID");
}

// const metadata = {
//     name: 'Web3Modal',
//     description: 'Web3Modal Example',
//     url: 'https://web3modal.com', // origin must match your domain & subdomain
//     icons: ['https://avatars.githubusercontent.com/u/37784886']
// }

// Create wagmiConfig
// const chains = [mainnet, sepolia] as const

export const config = createConfig({
  chains: [customChain],
  // chains: [mainnet, sepolia],
  // projectId,
  // metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [walletConnect({ projectId })],
  transports: {
    [customChain.id]: http(),
    // [mainnet.id]: http(),
    // [sepolia.id]: http(),
  },
});

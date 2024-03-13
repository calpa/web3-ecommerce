import { defineChain } from 'viem'

export const customChain = defineChain({
    id: 15602,
    name: 'BuildBear Required Lockjaw',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.buildbear.io/required-lockjaw-2f402d26'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.buildbear.io/required-lockjaw-2f402d26' },
    }
})
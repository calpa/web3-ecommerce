import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'
import Search from './components/Search'
import StoreProvider from './StoreProvider'

export const metadata: Metadata = {
  title: 'Wmazon',
  description: 'Wmazon'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <StoreProvider count={0}>
      <html lang="en">
        <body>
          <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
        </body>
      </html>
    </StoreProvider>
  )
}
import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'
import Search from './components/Search'

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
    <html lang="en">
      <body>
        <div className="bg-blue-400 text-white py-4 px-4 font-bold text-lg flex flex-row items-center">
          <div className="">
            Wmazon
          </div>
          <Search />

        </div>
        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}
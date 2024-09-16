import { ApolloProvider } from '@parkease/network/src/config/apollo'
import '@parkease/ui/src/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ApolloProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ApolloProvider>
  )
}

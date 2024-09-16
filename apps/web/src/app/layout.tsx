import { ApolloProvider } from '@parkease/network/src/config/apollo'
import '@parkease/ui/src/app/globals.css'
import { SessionProvider } from '@parkease/ui/src/components/molecules/SessionProvider'
import { Header } from '@parkease/ui/src/components/organisms/Header'
import { MenuItem } from '@parkease/util/types'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const MENUITEMS: MenuItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Bookings', href: '/bookings' },
  { label: 'About', href: '/about' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <ApolloProvider>
        <html lang="en">
          <body className={inter.className}>
            {' '}
            <Header menuItems={MENUITEMS} />
            {children}
          </body>
        </html>
      </ApolloProvider>
    </SessionProvider>
  )
}

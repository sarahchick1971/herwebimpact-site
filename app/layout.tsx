import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Her Web Impact',
  description: 'Empowering communities through digital tools',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}


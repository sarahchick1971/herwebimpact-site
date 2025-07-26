import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Her Web Impact',
  description: 'Empowering communities through digital tools',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}


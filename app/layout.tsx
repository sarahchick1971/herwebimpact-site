import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Her Web Impact',
  description: 'Empowering communities through digital tools',
  generator: 'Her Web Impact',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'York Sealing Solutions - Zsombor',
  description: 'Professional sealing and weatherproofing services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shirel Malka',
  description: 'Created with Shirel Malka',
  generator: 'Next.js',
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

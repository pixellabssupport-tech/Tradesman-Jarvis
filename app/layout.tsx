import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tradesman Jarvis',
  description: 'AI assistant for tradespeople',
  manifest: '/manifest.json',
  themeColor: '#FF6B00',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Tradesman Jarvis',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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

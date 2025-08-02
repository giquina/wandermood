import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WanderMood - AI Travel Concierge',
  description: 'Discover travel experiences based on your mood with AI-powered recommendations',
  keywords: 'travel, AI, mood-based travel, vacation planning, trip recommendations',
  authors: [{ name: 'WanderMood Team' }],
  openGraph: {
    title: 'WanderMood - AI Travel Concierge', 
    description: 'Discover travel experiences based on your mood with AI-powered recommendations',
    type: 'website',
    url: 'https://wandermood.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanderMood - AI Travel Concierge',
    description: 'Discover travel experiences based on your mood with AI-powered recommendations',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#667eea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WanderMood - Travel That Matches Your Emotions',
  description: 'Discover travel experiences based on how you want to feel. Intelligent travel discovery that understands your emotions and finds destinations that resonate with your soul.',
  keywords: 'emotional travel, mood-based travel, travel recommendations, destination discovery, travel experiences',
  authors: [{ name: 'WanderMood Team' }],
  openGraph: {
    title: 'WanderMood - Travel That Matches Your Emotions',
    description: 'Discover travel experiences based on how you want to feel.',
    type: 'website',
    url: 'https://wandermood.com',
    siteName: 'WanderMood',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanderMood - Travel That Matches Your Emotions',
    description: 'Discover travel experiences based on how you want to feel.',
    images: ['/og-image.jpg'],
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
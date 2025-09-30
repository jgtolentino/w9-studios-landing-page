import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'W9 Studios | Premium Commercial Production for Advertising Agencies | Metro Manila',
  description: 'Top-tier production studio specializing in TV commercials, corporate videos, and digital content for advertising agencies. Cinematic excellence with strategic creative execution.',
  keywords: 'production studio manila, commercial production philippines, advertising agency production partner, tv commercial production, corporate video manila',
  openGraph: {
    title: 'W9 Studios | Premium Commercial Production',
    description: 'Top-tier production studio in Metro Manila',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-studio-black text-studio-white antialiased">
        {children}
      </body>
    </html>
  )
}

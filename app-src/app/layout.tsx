import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '../contexts/theme-context'
import { AuthProvider } from './providers'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = {
  title: 'Contribase - Project Finding & Collaboration Platform',
  description: 'Discover open source projects, find ongoing collaborations, and connect with contributors. Your gateway to meaningful open source contributions.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
  },
}

import GlobalBackground from '../components/global-background'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased transition-colors duration-300 min-h-screen relative`}>
        <AuthProvider>
          <ThemeProvider>
            <GlobalBackground />
            <div className="relative z-10">
              {children}
            </div>
            <Analytics />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

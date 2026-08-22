import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  title: 'Yamuna Travels | Cab & Outstation Travel Service in Delhi',
  description: 'Yamuna Travels provides cab booking, outstation travel, local Delhi NCR rides, airport transfers, railway station transfers and group travel across North India.',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/favicon.png',
    apple: [{ url: '/favicon.png', type: 'image/png', sizes: '512x512' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#10252d',
  colorScheme: 'light',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerifDisplay.variable} bg-[#f5f1e9]`}>
      <body className={`${inter.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

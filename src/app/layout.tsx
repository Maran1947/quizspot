import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { ThemeToggleProvider } from '@/providers/themeProvider'
// import SocketProvider from '@/providers/socketProvider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'QuizSpot AI',
  description: 'An AI powered real-time quiz'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SocketProvider> */}
        <ThemeToggleProvider>
          {children}
          <Toaster />
        </ThemeToggleProvider>
        {/* </SocketProvider> */}
      </body>
    </html>
  )
}

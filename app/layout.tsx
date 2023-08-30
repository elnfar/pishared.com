import Navbar from '@/components/navbar/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter,Cinzel } from 'next/font/google'

const inter = Cinzel({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Echloud',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>  
        {children}
        
      </body>
    </html>
  )
}

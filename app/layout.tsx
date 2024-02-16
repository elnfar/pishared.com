import Navbar from '@/components/navbar/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter,Cinzel } from 'next/font/google'

const inter = Cinzel({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cloust',
  description: 'Share you files with Cloust securely and for free.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{background:'#000'}}>
        <Navbar/>  
        {children}
        
      </body>
    </html>
  )
}

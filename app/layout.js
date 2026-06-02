import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'StringTune — Master Your Skills',
  description: 'A cinematic journey to mastery',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}

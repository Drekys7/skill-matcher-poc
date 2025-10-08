import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skill Matcher PoC',
  description: 'System zur Aufgabenzuweisung für Mitarbeiter basierend auf ihren Fähigkeiten. Proof of Concept zur Demonstration des Matching-Algorithmus.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

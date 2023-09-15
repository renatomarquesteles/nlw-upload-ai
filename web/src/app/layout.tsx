import '@/styles/global.css'

import type { Metadata } from 'next'

import { ThemeProvider } from './providers/theme'

export const metadata: Metadata = {
  title: 'upload.ai',
  description: 'AI app to generate titles and descriptions for YouTube videos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import '@/styles/global.css'

import type { Metadata } from 'next'

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
      <body className="dark">{children}</body>
    </html>
  )
}

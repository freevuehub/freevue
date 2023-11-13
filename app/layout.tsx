import { SITE_CONFIG } from '~/constant'

import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: SITE_CONFIG.TITLE,
  description: SITE_CONFIG.DESCRIPTION,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className="dark">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout

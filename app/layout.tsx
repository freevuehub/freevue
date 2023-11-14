import Link from 'next/link'
import { SITE_CONFIG } from '~/constant'

import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.TITLE}`,
    default: SITE_CONFIG.TITLE,
  },
  description: SITE_CONFIG.DESCRIPTION,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="icon" href="https://og.freevue.dev/api/favicon" />
      </head>
      <body>
        <main className="max-w-[1200px] mx-auto">
          <header>
            <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
              {SITE_CONFIG.TITLE}
            </Link>
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout

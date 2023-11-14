import Link from 'next/link'
import { Grid } from '~/components'
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
        <main>
          <header className="fixed top-0 left-0 right-0 h-[30px] bg-dark px-[30px] py-[10px]">
            <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
              {SITE_CONFIG.TITLE}
            </Link>
          </header>
          {children}
        </main>
        {process.env.NODE_ENV !== 'production' && <Grid />}
      </body>
    </html>
  )
}

export default RootLayout

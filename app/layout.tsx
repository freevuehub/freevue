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
        <main className="pt-[50px]">
          <header className="fixed top-0 left-0 right-0 h-[50px] bg-dark flex items-center">
            <div className="w-[310px] text-center">
              <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
                {SITE_CONFIG.TITLE}
              </Link>
            </div>
          </header>
          <section className="flex">
            <nav className="w-[300px] bg-red-800 fixed left-0 top-[50px] h-full hidden laptop:block">
              <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
                {SITE_CONFIG.TITLE}
              </Link>
            </nav>
            <div className="desktop:w-[948px] laptop:w-[648px] mx-auto">{children}</div>
            <aside className="w-[300px] bg-red-800 fixed right-0 top-[50px] h-full hidden laptop:block">
              Navigation
            </aside>
          </section>
        </main>
      </body>
    </html>
  )
}

export default RootLayout

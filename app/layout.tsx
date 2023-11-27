import Link from 'next/link'
import { pipe, map, toArray, prop } from '@fxts/core'
import { getPostList } from '~/API'
import { SITE_CONFIG } from '~/constant'
import { NavList } from '~/components'

import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.TITLE}`,
    default: SITE_CONFIG.TITLE,
  },
  description: SITE_CONFIG.DESCRIPTION,
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await pipe(
    '',
    getPostList,
    map((item) => prop('properties', item)),
    map((item) => prop('category', item)),
    map((item) => prop('select', item)),
    toArray
  )

  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="icon" href="/icon" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon" sizes="32x32" />
      </head>
      <body>
        <main className="pt-[50px]">
          <header className="fixed top-0 left-0 right-0 h-[50px] bg-dark flex items-center dark:bg-[#282828] z-50">
            <div className="w-[310px] text-center">
              <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
                {SITE_CONFIG.TITLE}
              </Link>
            </div>
          </header>
          <section className="flex">
            <nav className="w-[300px] bg-red-800 fixed left-0 top-[50px] h-full hidden laptop:block dark:bg-[#282828]">
              <NavList list={data} />
            </nav>
            <div className="desktop:w-[948px] laptop:w-[648px] mx-auto py-[24px]">{children}</div>
            <aside className="w-[300px] bg-red-800 fixed right-0 top-[50px] h-full hidden laptop:block dark:bg-[#282828]">
              Navigation
            </aside>
          </section>
        </main>
      </body>
    </html>
  )
}

export default RootLayout

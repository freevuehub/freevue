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
        <main>
          <nav className="w-[300px] bg-red-800 fixed left-0 top-0 pt-[14px] h-full hidden laptop:block dark:bg-[#282828]">
            <div className="text-center">
              <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
                {SITE_CONFIG.TITLE}
              </Link>
            </div>
            <NavList list={data} />
          </nav>
          <section className="mx-auto p-[24px] pl-[324px]">{children}</section>
        </main>
      </body>
    </html>
  )
}

export default RootLayout

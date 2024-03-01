import Link from 'next/link'
import { pipe, map, toArray, prop, join } from '@fxts/core'
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
        <main className="min-h-[100vh] flex flex-col">
          <nav
            className={pipe(
              [
                'w-[300px]',
                'fixed',
                'left-0',
                'top-0',
                'pt-[14px]',
                'h-full',
                'hidden',
                'laptop:flex',
                'border-r-[1px]',
                'border-solid',
                'border-white',
                'flex',
                'flex-col',
              ],
              join(' ')
            )}
          >
            <div className="text-center">
              <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
                {SITE_CONFIG.TITLE}
              </Link>
            </div>
            <NavList list={data} />
            <ul className="mt-auto flex gap-[24px] flex-col p-[24px] hidden">
              {pipe(
                ['portfolio', 'about'],
                map((word) => (
                  <li key={word}>
                    <Link
                      href={{ pathname: `/${word}` }}
                      className={pipe(
                        [
                          'duration-300',
                          'transition',
                          'h-[48px]',
                          'flex',
                          'items-center',
                          'px-[12px]',
                          'border-[1px]',
                          'border-solid',
                          'border-transparent',
                          'dark:text-white',
                          'hover:border-primary',
                        ],
                        join(' ')
                      )}
                    >
                      {word.toLocaleUpperCase('es-en')}
                    </Link>
                  </li>
                )),
                toArray
              )}
            </ul>
          </nav>
          <section className="w-full mx-auto pl-[300px]">{children}</section>
          <footer className="pt-[10px] mt-auto">
            <p className="text-right dark:text-white/30">Copyright © FreeVue.</p>
          </footer>
        </main>
      </body>
    </html>
  )
}

export default RootLayout

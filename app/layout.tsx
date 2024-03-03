import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { pipe, map, toArray, prop } from '@fxts/core'
import { getPostList } from '~/API'
import { SITE_CONFIG, DEFAULT_OG_IMAGE, GOOGLE_ADS_URL } from '~/constant'
import { Header } from '~/components'

import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.TITLE}`,
    default: SITE_CONFIG.TITLE,
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
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
        <meta name="google-adsense-account" content={`ca-${SITE_CONFIG.G_ADS}`} />
        <link rel="icon" href="/icon" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon" sizes="32x32" />
        <Script
          async
          src={`${GOOGLE_ADS_URL}?client=ca-${SITE_CONFIG.G_ADS}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <main className="min-h-[100vh] flex flex-col">
          <Header navs={data} />
          <section className="w-full mx-auto pt-[59px] laptop:pt-0 laptop:pl-[300px]">
            {children}
          </section>
          <footer className="pt-[10px] mt-auto">
            <p className="text-right dark:text-white/30">Copyright © FreeVue.</p>
          </footer>
        </main>
      </body>
      <GoogleAnalytics gaId={SITE_CONFIG.G_TAG} />
    </html>
  )
}

export default RootLayout

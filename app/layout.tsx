import { SITE_CONFIG } from '~/constant'

import './globals.css'

import type { Metadata } from 'next'
import type { IChild } from '~/types'

export const metadata: Metadata = {
  title: SITE_CONFIG.TITLE,
  description: SITE_CONFIG.DESCRIPTION,
}

const RootLayout = (props: IChild) => {
  return (
    <html lang="ko" className="dark">
      <body>{props.children}</body>
    </html>
  )
}

export default RootLayout

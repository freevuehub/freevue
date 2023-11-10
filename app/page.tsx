'use server'

import Link from 'next/link'
import { Card } from '~/components'
import { SITE_CONFIG } from '~/constant'

const Home = () => {
  return (
    <main className="max-w-[1200px] mx-auto">
      <header>
        <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
          {SITE_CONFIG.TITLE}
        </Link>
      </header>
      <h1 className="font-taebaek text-[30px]"></h1>
      <Card>
        <p className="dark:text-white">배포 실수로 블로그 날라감..</p>
      </Card>
    </main>
  )
}

export default Home

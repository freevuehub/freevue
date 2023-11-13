'use server'

import Link from 'next/link'
import { pipe, range, map, toArray } from '@fxts/core'
import { Client } from '@notionhq/client'
import { Card } from '~/components'
import { SITE_CONFIG } from '~/constant'

const notion = new Client({
  auth: 'secret_XCVvCFdlfSZOyLPvs8xb7qCABBCHy1qieCs8eA8u5eQ',
})

const Home = () => {
  ;(async () => {
    const listUsersResponse = await notion.databases.retrieve({
      database_id: 'aaffdb0decad4da5ac6c15456dfe22f7',
    })
    console.log(listUsersResponse)
  })()

  // https://www.notion.so/freevue/aaffdb0decad4da5ac6c15456dfe22f7?v=b99028e495fb401ea973b8d2973b41a3&pvs=4

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
      <div className="fixed left-0 right-0 top-0 bottom-0 bg-[red] opacity-5">
        <div className="w-[1200px] mx-auto h-full bg-green-950 flex gap-[30px]">
          {pipe(
            12,
            range,
            map((index) => <div key={index} className="bg-amber-300 flex-1 h-full"></div>),
            toArray
          )}
        </div>
      </div>
    </main>
  )
}

export default Home

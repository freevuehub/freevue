'use server'

import Link from 'next/link'
import { pipe, range, map, toArray } from '@fxts/core'
import { Card } from '~/components'
import { getPostList } from '~/API'
import { SITE_CONFIG } from '~/constant'

const Home = async () => {
  const data = (await getPostList()) as any[]

  return (
    <main className="max-w-[1200px] mx-auto">
      <header>
        <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
          {SITE_CONFIG.TITLE}
        </Link>
      </header>
      <h1 className="font-taebaek text-[30px]"></h1>
      <Card className="my-[120px]">
        <p className="dark:text-white">배포 실수로 블로그 날라감..</p>
      </Card>
      {pipe(
        data,
        map((item: any) => (
          <Card key={item.id}>
            <p className="dark:text-white">{item.properties.title.title[0].plain_text}</p>
          </Card>
        )),
        toArray
      )}
      {/*<div className="fixed left-0 right-0 top-0 bottom-0 bg-[red] opacity-5">*/}
      {/*  <div className="w-[1200px] mx-auto h-full bg-green-950 flex gap-[30px]">*/}
      {/*    {pipe(*/}
      {/*      12,*/}
      {/*      range,*/}
      {/*      map((index) => <div key={index} className="bg-amber-300 flex-1 h-full"></div>),*/}
      {/*      toArray*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </main>
  )
}

export default Home

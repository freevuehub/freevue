'use server'

import Link from 'next/link'
import { pipe, map, toArray } from '@fxts/core'
import { Card } from '~/components'
import { getPostList } from '~/API'

const Home = async () => {
  const data = (await getPostList()) as any[]

  return (
    <>
      <Card className="my-[120px]">
        <p className="dark:text-white">배포 실수로 블로그 날라감..</p>
      </Card>
      {pipe(
        data,
        map((item: any) => (
          <Link key={item.id} href={`/${item.id}`}>
            <Card>
              <p className="dark:text-white">{item.properties.title.title[0].plain_text}</p>
            </Card>
          </Link>
        )),
        toArray
      )}
    </>
  )
}

export default Home

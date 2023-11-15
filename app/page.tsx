'use server'

import Link from 'next/link'
import { pipe, map, toArray, toAsync } from '@fxts/core'
import { Card } from '~/components'
import { getPostList } from '~/API'

const Home = async () => {
  const data = await pipe(
    '',
    getPostList,
    toAsync,
    map(({ id, properties }) => ({
      id,
      title: 'title' in properties.title ? properties.title.title[0].plain_text : '',
    })),
    toArray
  )

  return (
    <>
      <Card className="my-[120px]">
        <p className="dark:text-white">배포 실수로 블로그 날라감..</p>
      </Card>
      {pipe(
        data,
        map((item) => (
          <Link key={item.id} href={`/${item.id}`}>
            <Card>
              <p className="dark:text-white">{item.title}</p>
            </Card>
          </Link>
        )),
        toArray
      )}
    </>
  )
}

export default Home

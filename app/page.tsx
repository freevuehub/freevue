'use server'

import { Card, PostList } from '~/components'
import { getPostList } from '~/API'

import type { NextPage } from 'next'

const Home: NextPage = async () => {
  const data = await getPostList()

  return (
    <>
      <Card className="my-[120px]">
        <p className="dark:text-white">배포 실수로 블로그 날라감..</p>
      </Card>
      <PostList list={data} />
    </>
  )
}

export default Home

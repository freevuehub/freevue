'use server'

import { Card, PostList } from '~/components'
import { getPostList } from '~/API'

import type { NextPage } from 'next'

const Home: NextPage = async () => {
  const data = await getPostList()

  return (
    <>
      <PostList list={data} />
    </>
  )
}

export default Home

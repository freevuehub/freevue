'use server'

import { PostList } from '~/components'
import { getPostList } from '~/API'

import type { NextPage } from 'next'
import type { NextProps } from '~/types'

type Props = {} & NextProps

const Home: NextPage<Props> = async (props) => {
  const data = await getPostList(props.searchParams.c)

  return (
    <>
      <PostList list={data} />
    </>
  )
}

export default Home

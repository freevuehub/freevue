'use server'

import { getPageBlocks, getPageProperties, getPagePropertyById } from '~/API'
import { pipe, head, prop } from '@fxts/core'
import { property } from '@notion/util'
import { Markdown, Card } from '~/components'

import type { NextPage, Metadata } from 'next'

type Params = {
  params: {
    id: string
  }
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  try {
    return {
      title: '',
      openGraph: {
        images: '',
      },
      description: '',
    }
  } catch {
    return {}
  }
}

const Post: NextPage<Params> = async (props) => {
  const markdownString = await pipe(props.params.id, getPageBlocks)
  const title = await pipe(props.params.id, getPagePropertyById('title'))

  return (
    <div className="py-[60px]">
      <div className="max-w-[800px] mx-auto">
        <h1 className="dark:text-white text-5xl font-taebaek">{title}</h1>
        <Markdown>{markdownString}</Markdown>
      </div>
    </div>
  )
}

export default Post

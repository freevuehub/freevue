'use server'

import Image from 'next/image'
import { pipe, head, prop, join } from '@fxts/core'
import { property } from '@notion/util'
import { getPageBlocks, getPageProperties, getPagePropertyById } from '~/API'
import { Markdown } from '~/components'
import { DEFAULT_OG_IMAGE, SITE_CONFIG, PROPERTIES_ID } from '~/constant'

import type { NextPage, Metadata } from 'next'

type Params = {
  params: {
    id: string
  }
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  try {
    const data = await pipe(props.params.id, getPageProperties)

    const { title, thumbnail, summary } = data.properties

    return {
      title: pipe(title, property('title'), head, prop('plain_text')) || SITE_CONFIG.TITLE,
      openGraph: {
        images: [pipe(thumbnail, property('files'), head, prop('name')) || DEFAULT_OG_IMAGE],
      },
      description:
        pipe(summary, property('rich_text'), head, prop('plain_text')) || SITE_CONFIG.DESCRIPTION,
    }
  } catch {
    return {
      title: SITE_CONFIG.TITLE,
      openGraph: {
        images: [DEFAULT_OG_IMAGE],
      },
      description: SITE_CONFIG.DESCRIPTION,
    }
  }
}

const Post: NextPage<Params> = async (props) => {
  const markdownString = await pipe(props.params.id, getPageBlocks)
  const title = await pipe(props.params.id, getPagePropertyById('title'))
  const thumbnail = await pipe(props.params.id, getPagePropertyById(PROPERTIES_ID.THUMBNAIL))

  return (
    <div className={pipe(['laptop:max-w-[800px]', 'max-w-[100%]', 'mx-auto'], join(' '))}>
      {thumbnail && <Image width={800} height={400} src={thumbnail} alt="" />}
      <div className="laptop:px-0 px-[15px]">
        <h1 className="dark:text-white text-5xl font-taebaek mt-[60px]">{title}</h1>
        <Markdown>{markdownString}</Markdown>
      </div>
    </div>
  )
}

export default Post

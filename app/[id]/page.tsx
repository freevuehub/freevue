import { getPost } from '~/API'
import { isUndefined } from '@fxts/core'

import type { NextPage } from 'next'

import type { Metadata } from 'next'

type Params = {
  params: {
    id: string
  }
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const data = await getPost(props.params.id)

  if (isUndefined(data) || !('properties' in data)) {
    return {}
  }

  const { title, thumbnail, summary } = data.properties as any

  return {
    title: title.title[0].plain_text,
    openGraph: {
      images: [thumbnail.files[0].name],
    },
    description: summary.rich_text[0].plain_text,
  }
}

const Post: NextPage<Params> = async (props) => {
  const data = await getPost(props.params.id)

  if (isUndefined(data) || !('properties' in data)) {
    return <div>No Data</div>
  }

  const { title, thumbnail } = data.properties as any

  return (
    <div>
      <h1 className="dark:text-white">{title.title[0].plain_text}</h1>
      <img src={thumbnail.files[0].name} alt={title.title[0].plain_text} />
    </div>
  )
}

export default Post

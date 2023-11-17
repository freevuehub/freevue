import { getPost } from '~/API'
import { toAsync, pipe, toArray } from '@fxts/core'
import { PostDetail } from '~/components'

import type { NextPage, Metadata } from 'next'

type Params = {
  params: {
    id: string
  }
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  try {
    // const data = await getPost(props.params.id)
    //
    // if ('properties' in data) {
    //   const { title, thumbnail, summary } = data.properties
    //
    //   return {
    //     title: 'title' in title ? title.title[0].plain_text : '',
    //     openGraph: {
    //       images: ['files' in thumbnail ? thumbnail.files[0].name : ''],
    //     },
    //     description: 'rich_text' in summary ? summary.rich_text[0].plain_text : '',
    //   }
    // }

    return {}
  } catch {
    return {}
  }
}

const Post: NextPage<Params> = async (props) => {
  const [data, blocks] = await pipe(props.params.id, getPost)

  if (!('properties' in data)) {
    return <div>No Data</div>
  }

  const { title, thumbnail } = data.properties

  return (
    <div>
      <h1 className="dark:text-white">{'title' in title ? title.title[0].plain_text : ''}</h1>
      {'files' in thumbnail && (
        <img
          src={thumbnail.files[0].name}
          alt={'title' in title ? title.title[0].plain_text : ''}
        />
      )}
      <PostDetail list={blocks.results} />
    </div>
  )
}

export default Post

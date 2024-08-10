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
    const data = await pipe(props.params.id, getPageProperties)

    const { title, thumbnail, summary } = data.properties

    return {
      title: pipe(title, property('title'), head, prop('plain_text')) || '',
      openGraph: {
        images: [pipe(thumbnail, property('files'), head, prop('name')) || ''],
      },
      description: pipe(summary, property('rich_text'), head, prop('plain_text')) || '',
    }
  } catch {
    return {}
  }
}

const Note: NextPage<Params> = async (props) => {
  // const markdownString = await pipe(props.params.id, getPageBlocks)
  // const title = await pipe(props.params.id, getPagePropertyById('title'))

  return (
    <div>
      <Card className="w-[800px] p-[20px] mx-auto">
        <h1 className="dark:text-white text-5xl font-taebaek">Note</h1>
      </Card>
    </div>
  )
}

export default Note

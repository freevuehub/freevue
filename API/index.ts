import { Client } from '@notionhq/client'
import { pipe, prop, toAsync, head, toArray } from '@fxts/core'

import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
})

export const getPostList = async () => {
  try {
    return await pipe(
      [
        notion.databases.query({
          database_id: 'aaffdb0decad4da5ac6c15456dfe22f7',
          filter: {
            or: [
              {
                property: 'type',
                type: 'select',
                select: {
                  equals: 'Post',
                },
              },
              {
                property: 'status',
                type: 'select',
                select: {
                  equals: 'Public',
                },
              },
            ],
          },
        }),
      ],
      toAsync,
      head,
      prop('results')
    )
  } catch {
    return []
  }
}

export const getPost = async (id: string) => {
  return pipe(
    [
      notion.pages.retrieve({
        page_id: id,
      }),
    ],
    toAsync,
    head
  )
}

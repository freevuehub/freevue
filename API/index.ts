import { Client } from '@notionhq/client'
import { pipe, prop, toAsync, head, toArray } from '@fxts/core'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
})

export const getPostList = async () => {
  try {
    const data = (await pipe(
      [
        notion.databases.query({
          database_id: 'aaffdb0decad4da5ac6c15456dfe22f7',
          // page_size: 10,
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
    )) as PageObjectResponse[]

    console.log(data)

    return data
  } catch {
    return []
  }
}

export const getPostBySlug = async (id: string) => {
  return await notion.databases.query({
    database_id: 'aaffdb0decad4da5ac6c15456dfe22f7',
    filter: {
      or: [
        {
          property: 'slug',
          type: 'rich_text',
          rich_text: {
            equals: id,
          },
        },
      ],
    },
  })
}

export const getPost = async (id: string) => {
  try {
    return await pipe(
      [
        notion.pages.retrieve({
          page_id: id,
        }),
      ],
      toAsync,
      head
    )
  } catch {
    const { results } = await getPostBySlug(id)

    if (results.length) {
      return await notion.pages.retrieve({
        page_id: results[0].id,
      })
    }

    return {}
  }
}

export default notion

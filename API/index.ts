import { Client } from '@notionhq/client'
import { pipe, prop, toAsync, head, toArray, map } from '@fxts/core'
import { DB_ID } from '~/constant'

import type { PageObjectResponse, PostProperties } from '~/types'

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
})

export const getPostList = async () => {
  try {
    return (await pipe(
      notion.databases.query({
        database_id: DB_ID,
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
      prop('results'),
      map((item) => ({
        id: item.id,
        properties: 'properties' in item ? item.properties : {},
      })),
      map((item) => ({
        ...item,
        title: item.properties.title,
        thumbnail: item.properties.thumbnail,
        summary: item.properties.summary,
        tags: item.properties.tags,
        category: item.properties.category,
        date: item.properties.date,
      })),
      toArray
    )) as PostProperties[]
  } catch {
    return []
  }
}

export const getPostBySlug = async (id: string) => {
  return (await pipe(
    [
      notion.databases.query({
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
      }),
    ],
    toAsync,
    head,
    prop('results')
  )) as PageObjectResponse[]
}

export const getPost = async (id: string) => {
  try {
    return await pipe(
      [
        new Promise(async (resolve) => {
          const data = await notion.pages.retrieve({
            page_id: id,
          })

          return resolve(data)
        }),
        new Promise(async (resolve) => {
          const data = await notion.blocks.children.list({
            block_id: id,
          })

          return resolve(data)
        }),
      ],
      toAsync,
      toArray
    )
  } catch {
    const [post] = await getPostBySlug(id)

    if (!!post) {
      return (await notion.pages.retrieve({
        page_id: post.id,
      })) as PageObjectResponse
    }

    return {
      created_by: {},
      last_edited_by: {},
      object: 'page',
      id: '',
      created_time: '',
      last_edited_time: '',
      archived: false,
      url: '',
      public_url: '',
    }
  }
}

export default notion

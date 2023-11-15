import { Client } from '@notionhq/client'
import { pipe, prop, toAsync, head, toArray } from '@fxts/core'
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
})

export const getPostList = async () => {
  try {
    return (await pipe(
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
    return (await pipe(
      [
        notion.pages.retrieve({
          page_id: id,
        }),
      ],
      toAsync,
      head
    )) as PageObjectResponse
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

import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { pipe, prop, toAsync, head, toArray, map } from '@fxts/core'
import { property } from '@notion/util'
import { DB_ID, INITIAL_NOTION_PROPERTIES } from '~/constant'

import type { PageObjectResponse, PostProperties } from '~/types'

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
})
const notionToMarkdown = new NotionToMarkdown({ notionClient: notion })

const pageToMarkdown = async (id: string) => {
  try {
    return (
      (await pipe(
        notionToMarkdown.pageToMarkdown(id),
        toAsync,
        toArray,
        (data) => notionToMarkdown.toMarkdownString(data),
        prop('parent')
      )) || ''
    )
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getPostList = async (equals?: string) => {
  try {
    return (await pipe(
      notion.databases.query({
        database_id: DB_ID,
        // page_size: 10,
        filter: {
          and: [
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
            {
              property: 'category',
              type: 'select',
              select: {
                equals: equals || '',
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

export const getPageBlocks = async (id: string): Promise<string> => {
  try {
    return await pipe(id, pageToMarkdown)
  } catch {
    const [post] = await getPostBySlug(id)

    if (!!post) {
      return await getPageBlocks(post.id)
    }

    return ''
  }
}

export const getPageProperties = async (id: string): Promise<PageObjectResponse> => {
  try {
    const data = await pipe(id, (id) =>
      notion.pages.retrieve({
        page_id: id,
      })
    )

    if ('properties' in data) {
      return data
    }

    return INITIAL_NOTION_PROPERTIES
  } catch {
    const [post] = await getPostBySlug(id)

    if (!!post) {
      return await getPageProperties(post.id)
    }

    return INITIAL_NOTION_PROPERTIES
  }
}

export const getPagePropertyById =
  (propertyId: string) =>
  async (id: string): Promise<string> => {
    try {
      const data = await pipe(
        {
          page_id: id,
          property_id: propertyId,
        },
        notion.pages.properties.retrieve
      )

      if ('results' in data) {
        return pipe(data.results[0], property('title'), prop('plain_text')) || ''
      }

      return ''
    } catch {
      const [post] = await getPostBySlug(id)

      if (!!post) {
        return await pipe(post.id, getPagePropertyById(propertyId))
      }

      return ''
    }
  }

export default notion

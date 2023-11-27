import type { PageObjectResponse } from '~/types'

export const SITE_CONFIG = {
  TITLE: '프리뷰 블로그' as string,
  DESCRIPTION: '' as string,
}

export const PROPERTIES_ID = {
  TITLE: 'title',
  THUMBNAIL: 'WxpT',
  CATEGORY: 'ppED',
  SLUG: 'd%5Dhq',
  DATE: 'NX%5CQ',
  TAGS: 'sD%5Em',
  SUMMARY: 'wz%7CS',
  UPDATED_AT: 'zyLz',
}

export const DB_ID = 'aaffdb0decad4da5ac6c15456dfe22f7'

export const INITIAL_NOTION_PROPERTIES: PageObjectResponse = {
  object: 'page',
  id: '',
  created_time: '',
  last_edited_time: '',
  created_by: { object: 'user', id: '' },
  last_edited_by: { object: 'user', id: '' },
  cover: {
    type: 'external',
    external: {
      url: '',
    },
  },
  icon: null,
  parent: {
    type: 'database_id',
    database_id: '',
  },
  archived: false,
  properties: {
    date: { id: '', type: 'date', date: null },
    thumbnail: { id: '', type: 'files', files: [] },
    type: { id: '', type: 'select', select: null },
    slug: { id: '', type: 'rich_text', rich_text: [] },
    category: { id: '', type: 'select', select: null },
    tags: { id: '', type: 'multi_select', multi_select: [] },
    summary: { id: '', type: 'rich_text', rich_text: [] },
    updatedAt: {
      id: '',
      type: 'last_edited_time',
      last_edited_time: '',
    },
    author: { id: '', type: 'people', people: [] },
    title: { id: '', type: 'title', title: [] },
    status: {
      id: '',
      type: 'select',
      select: null,
    },
  },
  url: '',
  public_url: '',
}

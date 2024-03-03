import type { PageObjectResponse } from '~/types'

export const DEFAULT_OG_IMAGE =
  'https://og.freevue.dev/api/og?title=%ED%94%84%EB%A6%AC%EB%B7%B0%20%EB%B8%94%EB%A1%9C%EA%B7%B8&desc&image'
export const GOOGLE_ADS_URL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

export const SITE_CONFIG = {
  TITLE: '프리뷰 블로그' as string,
  DESCRIPTION: '안녕하세요. 프리뷰입니다.' as string,
  G_TAG: 'G-3E6F6R2714',
  G_ADS: 'pub-4182995337229754',
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

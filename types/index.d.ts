import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type * from '@notionhq/client/build/src/api-endpoints'

export type IClassName = string

export type IChild = {
  children?: React.ReactNode
  className?: IClassName
}

export type PostProperties = {
  id: string
  title: PageObjectResponse['properties']['title']
  thumbnail: PageObjectResponse['properties']['thumbnail']
  summary: PageObjectResponse['properties']['summary']
  tags: PageObjectResponse['properties']['tags']
  category: PageObjectResponse['properties']['category']
  date: PageObjectResponse['properties']['date']
  properties: PageObjectResponse['properties']
}

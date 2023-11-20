'use client'

import Link from 'next/link'
import { map, pipe, size, toArray } from '@fxts/core'
import { Card } from '~/components'

import type { PostProperties } from '~/types'

type IProps = {
  list: PostProperties[]
}

const PostList: React.FC<IProps> = (props) => {
  const list = pipe(
    props.list,
    map((item) => ({
      id: item.id,
      title: 'title' in item.title ? item.title.title[0].plain_text : '',
      thumbnail: 'files' in item.thumbnail ? item.thumbnail.files : [],
    })),
    toArray
  )

  return (
    <div className="flex flex-wrap justify-center gap-[24px] px-[24px] laptop:px-[0]">
      {pipe(
        list,
        map((item) => (
          <Link key={item.id} href={`/${item.id}`} className="w-[300px]">
            <Card>
              {/*{size(item.thumbnail) && <img src={item.thumbnail[0].name} alt="" />}*/}
              <div className="p-[12px]">
                <p className="dark:text-white">{item.title}</p>
              </div>
            </Card>
          </Link>
        )),
        toArray
      )}
    </div>
  )
}

export default PostList

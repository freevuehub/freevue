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
      date: 'date' in item.date ? item.date.date : { start: '' },
    })),
    toArray
  )

  console.log(list)

  return (
    <div className="flex flex-wrap gap-[24px] px-[24px] laptop:px-[0]">
      {pipe(
        list,
        map((item) => (
          <Link key={item.id} href={`/${item.id}`} className="w-[calc(20%-24px)]">
            <Card className="hover:scale-[1.03]">
              {/*{size(item.thumbnail) && <img src={item.thumbnail[0].name} alt="" />}*/}
              <div className="p-[12px] flex flex-col gap-[10px]">
                <h3 className="dark:text-white font-taebaek truncate">{item.title}</h3>
                <p className="dark:text-white/20 text-right">{item.date?.start || ''}</p>
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

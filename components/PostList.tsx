'use client'

import Link from 'next/link'
import { map, pipe, size, toArray, join, zipWithIndex } from '@fxts/core'
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
    <div className="flex flex-wrap border-t-[1px] border-white border-solid">
      {pipe(
        list,
        zipWithIndex,
        map(([index, item]) => (
          <Link key={item.id} href={`/${item.id}`} className="w-[25%]">
            <div className="h-[300px] border-r-[1px] border-b-[1px] border-white">
              <div
                className={pipe(
                  [
                    'flex',
                    'flex-col',
                    'p-[20px]',
                    'h-full',
                    'w-full',
                    'relative',
                    'border-solid',
                    'border-[1px]',
                    'transition',
                    'duration-300',
                    'border-transparent',
                    'hover:scale-[1.05]',
                    'hover:border-primary',
                    'hover:z-50',
                  ],
                  join(' ')
                )}
              >
                <h3 className="dark:text-white font-taebaek truncate">{item.title}</h3>
                <p className="dark:text-white/20 text-right mt-auto">{item.date?.start || ''}</p>
              </div>
            </div>
          </Link>
        )),
        toArray
      )}
    </div>
  )
}

export default PostList

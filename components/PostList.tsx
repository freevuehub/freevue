'use client'

import Link from 'next/link'
import { map, pipe, toArray, join, zipWithIndex } from '@fxts/core'

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

  return (
    <div className="flex flex-wrap border-t-[1px] border-white border-solid">
      {pipe(
        list,
        zipWithIndex,
        map(([, item]) => (
          <Link
            key={item.id}
            href={`/${item.id}`}
            className={pipe(
              [
                'w-[50%]',
                'laptop:w-[25%]',
                'desktop:w-[20%]',
                'border-r-[1px]',
                'border-b-[1px]',
                'border-white',
                'even:border-r-0',
                'laptop:even:border-r-[1px]',
              ],
              join(' ')
            )}
          >
            <div className="laptop:h-[300px] h-[250px]">
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
                    'laptop:hover:scale-[1.05]',
                    'laptop:hover:border-primary',
                    'laptop:hover:z-50',
                  ],
                  join(' ')
                )}
              >
                <h3 className="dark:text-white font-taebaek line-clamp-2 break-keep mb-auto">
                  {item.title}
                </h3>
                <p className="dark:text-white/20 text-right">{item.date?.start || ''}</p>
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

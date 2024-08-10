'use client'

import Link from 'next/link'
import { map, pipe, toArray, concat, reduce, isNil, join } from '@fxts/core'

type Props = {
  list: (
    | {
        id: string
        name: string
      }
    | null
    | undefined
  )[]
}

const NavList: React.FC<Props> = (props) => {
  const navMap = pipe(
    props.list,
    concat([new Map()]),
    reduce((prev, cur) => {
      if (prev instanceof Map && !(cur instanceof Map) && !isNil(cur)) {
        prev.set(cur.id, cur)
      }

      return prev
    })
  ) as Map<string, any>

  return (
    <ul className="flex gap-[24px] flex-col p-[24px]">
      {pipe(
        navMap.keys(),
        map((key) => (
          <li key={key}>
            <Link
              href={{
                pathname: '/',
                query: { c: navMap.get(key).name },
              }}
              className={pipe(
                [
                  'duration-300',
                  'transition',
                  'h-[48px]',
                  'flex',
                  'items-center',
                  'px-[12px]',
                  'border-[1px]',
                  'border-solid',
                  'border-transparent',
                  'dark:text-white',
                  'hover:border-primary',
                ],
                join(' ')
              )}
            >
              {navMap.get(key).name}
            </Link>
          </li>
        )),
        toArray
      )}
    </ul>
  )
}

export default NavList

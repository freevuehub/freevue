'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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
  const router = useSearchParams()
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
                  'dark:text-white',
                  'hover:bg-primary',
                  router.get('c') === key ? 'bg-primary' : 'bg-transparent',
                  'duration-300',
                  'transition',
                  'h-[48px]',
                  'rounded-[8px]',
                  'flex',
                  'items-center',
                  'px-[12px]',
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

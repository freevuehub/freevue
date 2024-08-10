'use client'

import Link from 'next/link'
import { useState } from 'react'
import { pipe, map, toArray, join, concat } from '@fxts/core'
import { SITE_CONFIG } from '~/constant'
import { NavList } from '~/components'

type Props = {
  navs: (
    | {
        id: string
        name: string
      }
    | null
    | undefined
  )[]
}

const Header: React.FC<Props> = (props) => {
  const [active] = useState<boolean>(false)

  return (
    <nav
      className={pipe(
        [
          'fixed',
          'left-0',
          'top-0',
          'border-solid',
          'border-white',
          'w-full',
          'h-[60px]',
          'border-b-[1px]',
          'bg-dark',
          'z-50',
          'laptop:border-b-0',
          'laptop:border-r-[1px]',
          'laptop:w-[300px]',
          'laptop:h-full',
          'laptop:flex',
        ],
        join(' ')
      )}
    >
      <div className={pipe(['pt-[14px]', 'h-full', 'flex', 'flex-col', 'w-full'], join(' '))}>
        <div className="text-center">
          <Link href={{ pathname: '/' }} className="dark:text-white font-taebaek text-[20px]">
            {SITE_CONFIG.TITLE}
          </Link>
        </div>
        <div
          className={pipe(
            ['laptop:translate-x-0'],
            concat(active ? ['translate-x-0'] : ['translate-x-[-100%]']),
            join(' ')
          )}
        >
          <NavList list={props.navs} />
          <ul className="mt-auto flex gap-[24px] flex-col p-[24px] hidden">
            {pipe(
              ['portfolio', 'about'],
              map((word) => (
                <li key={word}>
                  <Link
                    href={{ pathname: `/${word}` }}
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
                    {word.toLocaleUpperCase('es-en')}
                  </Link>
                </li>
              )),
              toArray
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header

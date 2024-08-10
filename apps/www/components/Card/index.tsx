'use client'

import { pipe, join } from '@fxts/core'

import type { IChild } from '~/types'

type IProps = {} & IChild

const Card: React.FC<IProps> = (props) => {
  return (
    <div
      className={pipe(
        [
          'transition',
          'transition-[1000]',
          'overflow-hidden',
          'dark:bg-[#282828]',
          'rounded-[5px]',
          'shadow-xl',
          props.className || '',
        ],
        join(' ')
      )}
    >
      {props.children}
    </div>
  )
}

export default Card

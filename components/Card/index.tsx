'use client'

import type { IChild } from '~/types'

type IProps = {} & IChild

const Card: React.FC<IProps> = (props) => {
  return <div className={props.className || ''}>{props.children}</div>
}

export default Card

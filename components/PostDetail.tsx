'use client'

import { pipe, map, toArray } from '@fxts/core'

type Props = {
  list: any[]
}

const PostDetail: React.FC<Props> = (props) => {
  console.log(props)

  return (
    <div>
      {pipe(
        props.list,
        map((item) => (
          <p key={item.id} className="dark:text-white">
            {item.id}
          </p>
        )),
        toArray
      )}
    </div>
  )
}

export default PostDetail

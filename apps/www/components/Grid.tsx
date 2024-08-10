'use client'

import { range, pipe, map, toArray } from '@fxts/core'

const Grid: React.FC = () => {
  return (
    <div className="flex fixed left-0 top-0 right-0 bottom-0 bg-red-800 opacity-30 z-50 gap-[12px]">
      {pipe(
        12,
        range,
        map((index) => (
          <div className="flex-1 bg-amber-300" key={index}>
            {index}
          </div>
        )),
        toArray
      )}
    </div>
  )
}

export default Grid

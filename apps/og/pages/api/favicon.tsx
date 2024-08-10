import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}
const favicon = (props: any) => {
  const size = props.nextUrl.searchParams.get('size')
  const style = props.nextUrl.searchParams.get('style')

  const currentSize = `${size || 100}%`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        <img
          src="https://og.freevue.dev/api/logo?size=100&style=border"
          alt=""
          style={{ display: 'flex', width: '100%' }}
        />
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
}

export default favicon

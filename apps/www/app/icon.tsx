import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

// Image generation
const Icon = () =>
  new ImageResponse(<img src="https://og.freevue.dev/api/favicon" alt="F" />, {
    ...size,
  })

export default Icon

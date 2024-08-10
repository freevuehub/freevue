import { ImageResponse } from '@vercel/og'
import { COLOR_LIST, SECONDARY_COLOR } from '~/contant'

export const config = {
  runtime: 'edge',
}

interface ILogoProps {
  primaey: string
  secondary: string
  style?: string
}

const [primary, secodary] = COLOR_LIST[2024]
const PRIMARY_RGB = `rgb(${primary.join(',')})`
const SECONDARY_RGB = `rgb(${(secodary || SECONDARY_COLOR(primary)).join(',')})`

const LogoSVG: React.FC<ILogoProps> = (props) => {
  return (
    <svg viewBox="0 0 8560 7980" style={{ width: '100%', height: '100%' }}>
      <path
        fill={props.primaey}
        d="M6 7961 c-8 -12 20 -363 40 -504 72 -521 207 -933 401 -1225 70 -106 224 -262 318 -324 125 -81 128 -89 110 -279 -40 -409 -40 -981 0 -1359 103 -988 408 -1769 937 -2401 116 -138 335 -359 447 -449 68 -55 79 -69 75 -89 -6 -28 2 -36 146 -139 431 -311 972 -555 1559 -702 73 -18 86 -19 105 -7 18 12 42 10 196 -19 299 -57 503 -77 775 -78 266 0 392 13 596 64 442 111 824 325 1207 673 285 259 556 609 700 905 37 77 75 141 91 153 14 11 93 57 174 102 399 221 628 461 669 703 15 92 0 166 -46 227 -90 120 -326 206 -608 222 -56 3 -580 10 -1162 14 -959 8 -1060 10 -1068 25 -5 9 -13 16 -18 16 -16 0 -11 -60 9 -133 45 -155 111 -537 111 -639 l0 -47 -57 -7 c-70 -8 -310 10 -413 32 -266 56 -536 192 -715 359 l-58 55 6 72 c17 200 20 328 7 328 -7 0 -18 -8 -25 -17 -12 -16 -21 -16 -146 5 -389 64 -957 272 -1341 489 -682 387 -1098 878 -1254 1481 -19 73 -34 156 -34 184 0 79 22 105 142 167 396 207 711 513 943 915 120 210 229 485 285 719 18 76 18 107 -1 107 -6 0 -85 -33 -178 -74 -377 -168 -696 -276 -966 -327 -171 -33 -385 -33 -505 0 -274 74 -700 290 -1095 554 -108 73 -258 184 -303 226 -35 32 -47 37 -56 22z"
      />
      <path
        fill={props.secondary}
        d="M4523 4484 c-58 -9 -57 -7 -34 -327 23 -319 30 -686 17 -925 l-8 -153 53 -50 c132 -124 429 -286 623 -339 164 -45 427 -71 569 -56 l67 8 -6 76 c-9 115 -42 341 -70 477 -26 129 -91 374 -103 390 -4 6 -23 48 -41 95 -100 256 -277 516 -427 629 -75 56 -226 127 -320 151 -80 20 -256 33 -320 24z"
      />
      <path
        fill={props.secondary}
        d="M2300 1268 c-33 -60 -67 -102 -135 -165 -179 -169 -427 -360 -701 -539 -79 -52 -148 -103 -154 -114 -6 -12 -10 -33 -8 -48 3 -22 23 -38 135 -103 332 -191 752 -289 1193 -276 502 14 919 136 1449 425 76 41 82 46 60 53 -13 4 -91 26 -174 48 -595 159 -1187 447 -1582 767 l-38 32 -45 -80z"
      />
    </svg>
  )
}

const logo = (props: any) => {
  const size = props.nextUrl.searchParams.get('size')
  const style = props.nextUrl.searchParams.get('style')
  const color = props.nextUrl.searchParams.get('color')
  const currentSize = `${(style || '').includes('fit') ? 100 : size || 100}%`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: currentSize,
            height: currentSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...((style || '').includes('border')
              ? {
                  borderRadius: '25%',
                  backgroundColor: PRIMARY_RGB,
                }
              : {}),
          }}
        >
          <div
            style={
              style === 'border'
                ? {
                    display: 'flex',
                    width: '65%',
                    height: '65%',
                    padding: '13%',
                    borderRadius: '50%',
                    backgroundColor: 'rgb(255, 255, 255)',
                  }
                : {
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                  }
            }
          >
            <LogoSVG
              primaey={color || PRIMARY_RGB}
              secondary={color || SECONDARY_RGB}
              style={props.style}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: (style || '').includes('fit') ? Number(size) : 512,
      height: (style || '').includes('fit') ? Number(size) : 512,
    }
  )
}

export default logo

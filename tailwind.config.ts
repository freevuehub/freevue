import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      taebaek: ['TAEBAEKfont'],
      pretendard: [
        'Pretendard Variable',
        'Pretendard',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'Roboto',
        'Helvetica Neue',
        'Segoe UI',
        'Apple SD Gothic Neo',
        'Noto Sans KR',
        'Malgun Gothic',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        dark: '#1C1C1CFF',
      },
    },
    screens: {
      desktop: '1644px',
      laptop: '1368px',
    },
  },
  plugins: [],
}
export default config

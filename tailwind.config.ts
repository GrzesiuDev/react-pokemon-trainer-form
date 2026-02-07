import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#171717',
        primary: {
          DEFAULT: '#9747ff',
          dark: '#7135bf',
          light: 'rgba(151, 71, 255, 0.25)',
        },
        error: '#ff4e4e',
      },
      borderRadius: {
        xs: '0.125rem',
      },
      maxWidth: {
        '20': '5rem',
        '75': '18.75rem',
        '160': '40rem',
      },
      minWidth: {
        '75': '18.75rem',
      },
    },
  },
  plugins: [],
}

export default config

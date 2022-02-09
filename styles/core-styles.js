import { globalCss, createStitches } from '@stitches/react'

export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0 },
  body: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#333',
  },
  div: {
    display: 'block',
  },
})

export const { styled } = createStitches({
  theme: {
    colors: {
      grey50: 'hsl(0, 0%, 50%)',
      grey80: 'hsl(0, 0%, 80%)',
      grey90: 'hsl(0, 0%, 90%)',
    },
  },
  utils: {
    span: v => ({
      flex: `0 0 ${(v * 100) / 24}%`,
    }),
  },
})
import * as RadixSeparator from '@radix-ui/react-separator'
import { styled } from './core-styles'

export const Input = styled('input', {
  fontSize: '1.2em',
  borderRadius: 5,
  border: '2px solid $grey50',
  lineHeight: 2,
  width: '100%',
  boxSizing: 'border-box',
  padding: '0 5px',
  '&::-webkit-input-placeholder': {
    color: '$grey80',
  },
})

export const Separator = styled(RadixSeparator.Root, {
  display: 'flex',
  height: 20,
})

export const Title = styled('h1', { color: '$grey50' })

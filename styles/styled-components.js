import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as RadixSeparator from '@radix-ui/react-separator'
import { styled } from './core-styles'
import { Row } from './grid-components'

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

export const RowTodo = styled(Row, {
  padding: 2,
  '&:hover': {
    backgroundColor: '$grey95',
  },
})

export const CheckboxRoot = styled(RadixCheckbox.Root, {
  all: 'unset',
  backgroundColor: 'white',
  border: '1px solid $grey90',
  width: 25,
  height: 25,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
})

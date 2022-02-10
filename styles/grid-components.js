import { styled } from './core-styles'

export const Layout = styled('section', {
  display: 'flex',
  flex: 'auto',
  flexDirection: 'column',
  height: '100vh',
})

export const Content = styled('main', {
  flex: 'auto',
  padding: '0 20px',
  alignItems: 'center',
})

export const Header = styled('header', {
  display: 'block',
  borderBottom: '1px solid $grey80',
  padding: '0 10px',
})

export const Row = styled('div', {
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Col = styled('div', {
  display: 'block',
})

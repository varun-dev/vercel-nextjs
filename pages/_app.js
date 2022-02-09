import { globalStyles } from '../styles/core-styles'

export default function App({ Component, pageProps }) {
  globalStyles()
  return <Component {...pageProps} />
}

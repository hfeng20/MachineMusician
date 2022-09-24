import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Wrapper from '../src/Wrapper/Wrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp

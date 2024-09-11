import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      </Head>
      <Script src="https://swch.github.io/Strivve-UX-Components/main.js"></Script>
      <Component {...pageProps} />
    </>
  )
}

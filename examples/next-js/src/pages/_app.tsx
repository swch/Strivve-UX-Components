import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="https://swch.github.io/Strivve-UX-Components/main.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

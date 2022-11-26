import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ParticlesWrapper from '../components/ParticlesWrapper'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <ParticlesWrapper>
  <Component {...pageProps} />
  </ParticlesWrapper>
  </>
}


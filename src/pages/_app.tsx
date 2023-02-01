import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      if (Math.random() > 0.5) {
        window.location.href = "https://shattereddisk.github.io/rickroll/rickroll.mp4"
      }
    }
  }, [])
  
  return <Component {...pageProps} />
}

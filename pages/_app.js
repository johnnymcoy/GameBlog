import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import Script from 'next/script'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
      {/* <Script type="text/javascript"
                sc_project={12901413} 
                sc_invisible={1}
                sc_security={665e0953}
                />
            <Script type="text/javascript"
            src="https://www.statcounter.com/counter/counter.js"
            async />       */}
    </ThemeProvider>
  )
}

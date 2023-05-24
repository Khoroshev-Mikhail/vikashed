import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr'
import Layout from '@/components/layout/Layout'


const fetcher = (resource: RequestInfo, init?: RequestInit) => fetch(resource, init).then(res => res.json())
const SWRoptions = {
    refreshInterval: 3000,
    fetcher
}

export default function App({Component, pageProps: { session, ...pageProps }}: AppProps) {
  return (
        <SessionProvider session={session}>
            <SWRConfig value={SWRoptions} >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SWRConfig>
        </SessionProvider>
  )
}
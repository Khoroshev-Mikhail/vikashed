import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr'
import { Plus_Jakarta_Sans } from 'next/font/google'


const fetcher = (resource: RequestInfo, init?: RequestInit) => fetch(resource, init).then(res => res.json())
const SWRoptions = {
    refreshInterval: 3000,
    fetcher
}
const main_font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function App({Component, pageProps: { session, ...pageProps }}: AppProps) {
  return (
        <SessionProvider session={session}>
            <SWRConfig value={SWRoptions} >
                <div className={`${main_font.className}`}>
                    <Component {...pageProps} />
                </div>
            </SWRConfig>
        </SessionProvider>
  )
}
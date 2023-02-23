import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  <QueryClientProvider client={queryClient}>
  <Hydrate state={pageProps.dehydratedState}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <Devtools />
  </Hydrate>
</QueryClientProvider>
}

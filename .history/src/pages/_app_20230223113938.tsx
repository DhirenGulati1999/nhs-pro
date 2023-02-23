import "@/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { config } from "src/lib/react-query-config";
import Devtools from 'src/components/Devtools';
import Layout from 'src/components/Layout';

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Devtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

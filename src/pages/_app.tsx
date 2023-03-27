import "@/styles/globals.css";
import { config } from "src/lib/react-query-config";
import Layout from "src/components/Layout";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../state/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

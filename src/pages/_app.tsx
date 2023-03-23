import "@/styles/globals.css";
import { config } from "src/lib/react-query-config";
import Layout from "src/components/Layout";

import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

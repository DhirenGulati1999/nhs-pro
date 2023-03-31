import Layout from '@/components/Layout';
import { getGlobalPageProps } from '@/lib/serverSideProps';
import { setPartner } from '@/state/slices/partnerSlice';
import { store } from '@/state/store';
import App, { AppContext, AppProps } from "next/app";
import { useEffect } from 'react';
import { Provider, useStore } from 'react-redux';

type TProps = AppProps & {
  props: {};
};

export function MyCustomApp({ Component, pageProps }: TProps) {
  useEffect(() => {
  const dispatch = store.dispatch;
  dispatch(setPartner(pageProps.partner));
  }, [])
  
  return (
    <>
      <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </>
  );
}

MyCustomApp.getInitialProps = async (context: AppContext) => {
  const props = await getGlobalPageProps(context);
  return { pageProps: props };
};

export default MyCustomApp;


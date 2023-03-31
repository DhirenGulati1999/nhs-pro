import Layout from "@/components/Layout";
import { getGlobalPageProps } from "@/lib/serverSideProps";
import { setPartner } from "@/state/slices/partnerSlice";
import { wrapper } from "@/state/store";
import { AppContext, AppProps } from "next/app";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

type TProps = AppProps & {
  props: {};
};

export function MyCustomApp({ Component, pageProps }: TProps) {
 const { store, props } = wrapper.useWrappedStore(pageProps);
  //console.log("store", store.getState());
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

export default wrapper.withRedux(MyCustomApp);
import { FC } from "react";
import { Provider } from "react-redux";
import { wrapper } from "../state/store";
import Layout from "@/components/Layout/Layout";
import { getGlobalPageProps } from "@/lib/serverSideProps";
import { setPartner } from "@/state/slices/partnerSlice";
import App, { AppContext, AppProps } from "next/app";
import "@progress/kendo-theme-default/dist/all.css";

type TProps = AppProps & {
  props: {};
};

export function MyCustomApp({ Component, ...rest }: TProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyCustomApp;

MyCustomApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (props) => {
    const res = await getGlobalPageProps(props);
    res.Partner && store.dispatch(setPartner(res.Partner));
  }
);

import { Home } from "@/components/Home/Home";
import { getGlobalPageProps } from "@/lib/serverSideProps";
import { setPartner } from "@/state/slices/partnerSlice";
import { wrapper } from "@/state/store";

export default function HomePage({partner} : any) {
  // console.log("Home Partner", partner);
  return (
    <>
      <Home />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      // we can set the initial state from here
      // we are setting to false but you can run your custom logic here
      const props = await getGlobalPageProps(params);

      if (props.partner) {
        store.dispatch(setPartner(props.partner));
      }
      console.log("State on server", store.getState());
      return {
        props: store.getState()
      };
    }
);

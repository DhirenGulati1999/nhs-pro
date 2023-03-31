import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import Header from "./Header";
import Error from "../Error/Error";

function Layout({ children }: any) {
  const { Partner } = useAppSelector((state: RootState) => state.partner);
  console.log("Partner---------", Partner);
  return (
    <div>
      <Header />
      {
        <div>{children}</div>
      }
    </div>
  );
}

export default Layout;

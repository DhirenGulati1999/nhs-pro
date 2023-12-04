import { Home } from "@/components/Home/Home";
import { getGlobalPageProps } from "@/lib/serverSideProps";
import { setPartner } from "@/state/slices/partnerSlice";
import { wrapper } from "@/state/store";
export default function HomePage({ partner }: any) {
  return (
    <>
      <Home />
    </>
  );
}

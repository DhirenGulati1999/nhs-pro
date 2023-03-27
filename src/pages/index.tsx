import { getPartner } from "@/api/parner";
import { Partner } from "@/interfaces/partner";
import { useAppDispatch } from "@/state/hooks";
import { setPartner } from "@/state/slices/partnerSlice";
import { Home } from "@/components/Home/Home";

export default function HomePage({ partner }: { partner: Partner }) {
  console.log("partner:", partner);
  const dipatch =  useAppDispatch();
  dipatch(setPartner(partner));
  return <><Home/></>;
}


export const getServerSideProps = async (context: any) => {
  let isError = false;
  let data = null;
  try {
    data = await getPartner("");
  } catch (error: any) {
    isError = true;
    context.res.statusCode = error.response.status;
  }

  return {
    props: {
      isError,
      partner: data,
    },
  };
};
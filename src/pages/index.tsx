import { getPartner } from "@/api/parner";
import { Partner } from "@/interfaces/Partner";
import { useAppDispatch } from "@/state/hooks";
import { setPartner } from "@/state/slices/partnerSlice";
import { Home } from "@/components/Home/Home";
import { useEffect } from "react";

export default function HomePage({ partner }: { partner: Partner }) {
  console.log("partner:", partner);
  const dipatch = useAppDispatch();
  useEffect(() => {
    dipatch(setPartner(partner));
  }, []);
  return (
    <>
      {partner.PartnerName}
      <Home />
    </>
  );
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
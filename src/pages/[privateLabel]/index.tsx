import { getPartner } from "@/api/parner";
import { Home } from "@/components/Home/Home";
import { Partner } from "@/interfaces/Partner";
import { useAppDispatch } from "@/state/hooks";
import { setPartner } from "@/state/slices/partnerSlice";
import { useEffect } from "react";

export default function HomePage({ partner }: { partner: Partner }) {
  const dipatch =  useAppDispatch();
  useEffect(() => {
    dipatch(setPartner(partner));
  }, [])
  
  return <><Home/></>;
}

export const getServerSideProps = async (context: any) => {
  const { privateLabel } = context.params;
  console.log("url path" + context);

  let isError = false;
  let data = null;
  try {
    data = await getPartner(privateLabel);
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

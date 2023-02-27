import { getParner } from "@/api/parner";
import { withCSR } from "@/HOC/with-CSR";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface Partner {
  partnerId: number;
  partnerName: string;
  privateLabelSite: string;
  statusId: number;
}

export default function Home() {
  const router = useRouter();
  

  useEffect(() => {
    debugger;
    const partnerSiteUrl = router.asPath.replace("/", "");
    if (Object.keys(router.query).length !== 0 && partnerSiteUrl) {
      getPartnerData(partnerSiteUrl);
    }
  }, [getPartnerData, router.asPath, router.query]);

  console.log(router.asPath);

  if (!partner) {
    return <h1>Loading...</h1>;
  }
  return <h1>Sub partner page for {partner.partnerName}</h1>;
}

export const getServerSideProps = withCSR(async (ctx: any) => {
  debugger;
  console.log("getServerSideProps");

  const { privateLabel } = ctx.params;
  console.log("url path" + ctx);

  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(["post", privateLabel], () =>
      getParner(privateLabel)
    );
  } catch (error: any) {
    isError = true;
    ctx.res.statusCode = error.response.status;
  }

  return {
    props: {
      //also passing down isError state to show a custom error component.
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
});
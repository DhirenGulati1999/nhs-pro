import { getParner } from "@/api/parner";
import { withCSR } from "@/HOC/with-CSR";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Error from "src/components/Error";

interface Partner {
  partnerId: number;
  partnerName: string;
  privateLabelSite: string;
  statusId: number;
}

export default function Home() {
  const router = useRouter();
  const [partner, setPartner] = useState<Partner | null>(null);

  const getPartnerData = useCallback(
    async (partnerSiteUrl: string) => {
      try {
        const { data } = await axios.get<Partner>(
          `https://localhost:7149/Partner/GetPartner?privateSiteLabel=${partnerSiteUrl}`
        );
        setPartner(data);
      } catch (error) {
        router.replace("/_error");
      }
    },
    [router]
  );

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



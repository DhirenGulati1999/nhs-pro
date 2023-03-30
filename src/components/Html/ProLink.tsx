import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import Link from "next/link";
import React from "react";

export const ProLink = ({ url, urlText }: { url: string, urlText : string }) => {
    const partner = useAppSelector(
        (state: RootState) => state.partner.Partner
      );
  return (
    <Link
    
      href={
        partner?.PartnerId == 88
          ? url
          : partner?.PrivateLabelSite
          ? `/${partner?.PrivateLabelSite}${url}`
          : url
      }
    >
      {urlText}
    </Link>
  );
};

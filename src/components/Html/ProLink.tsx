import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import Link from "next/link";
import React from "react";

export const ProLink = ({ url, urlText }: { url: string, urlText : string }) => {
    const {Partner} = useAppSelector(
        (state: RootState) => state.partnerData
      );
  return (
    <Link
    
      href={
        Partner?.PartnerId == 88
          ? url
          : Partner?.PrivateLabelSite
          ? `/${Partner?.PrivateLabelSite}${url}`
          : url
      }
    >
      {urlText}
    </Link>
  );
};

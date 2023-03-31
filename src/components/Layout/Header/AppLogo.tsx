import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import Image from "next/image";
import Link from "next/link";

function AppLogo() {
  const { Partner } = useAppSelector((state: RootState) => state.partnerData);
  if(!Partner?.PartnerId) return <></>

  return (
    <div suppressHydrationWarning>
      {Partner.PartnerLogo ? (
        <Link href="/prodemo">
        <Image
          src={Partner?.PartnerLogo ?? ""}
          alt="Partner Logo"
          width={200}
          height={100}
          priority={true}
        />
        </Link>
        
      ) : (
        <></>
      )}
    </div>
  );
}

export default AppLogo;

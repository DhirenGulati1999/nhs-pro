import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import Image from "next/image";

function AppLogo() {
  const { Partner } = useAppSelector((state: RootState) => state.partner);
  if(!Partner.PartnerId) return <></>

  return (
    <div suppressHydrationWarning>
      {Partner.PartnerLogo ? (
        <Image
          src={Partner?.PartnerLogo ?? ""}
          alt="Partner Logo"
          width={200}
          height={100}
          priority={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default AppLogo;

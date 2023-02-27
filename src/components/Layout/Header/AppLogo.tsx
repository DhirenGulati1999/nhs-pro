import { usePartner } from "@/hooks/api/partner";
import Image from "next/image";
import { useRouter } from "next/router";

function AppLogo() {
  const {
    query: { privateLabel },
  } = useRouter();

  console.log("my private label", privateLabel);
  const {data, isLoading} = usePartner(privateLabel);
  console.log(data, isLoading);
  return <div>
     <Image
      src={data?.PartnerLogo ?? ""}
      alt="Partner Logo"
      width={200}
      height={100} priority={true}
    />
  </div>;
}

export default AppLogo;

import Image from "next/image";
import { useRouter } from "next/router";
import {Partner} from "../../../interfaces/partner"
function AppLogo() {
   const {data, isLoading} : {data: Partner, isLoading : boolean} = {data: {}, isLoading: true};
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

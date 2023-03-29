import { BaseResponse } from "@/interfaces/Response";
import { User } from "@/interfaces/User";
import https from "https";
import axios from "src/lib/axios";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
export const getUser = async (logonName: string, password: string, partnerId: number) : Promise<BaseResponse<User>> => {
  const { data } = await axios.get(
    `/Account/SignIn?logonName=${logonName}&password=${password}&partnerId=${partnerId}`,
    { httpsAgent }
  );
  return data;
};
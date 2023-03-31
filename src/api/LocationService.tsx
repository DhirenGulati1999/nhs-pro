import { Location } from "@/interfaces/Location";
import https from "https";
import axios from "src/lib/axios";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
export const getLocations = async (searchTearm: any): Promise<Location[]> => {
  const { data } = await axios.get(
    `/GetLocations?partnerId=88&searchText=${searchTearm}`,
    { httpsAgent }
  );
  return data;
};

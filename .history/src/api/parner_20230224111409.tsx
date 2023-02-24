import https from "https";
import axios from "src/lib/axios";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
export const getParner = async (siteurl: any) => {
  const { data } = await axios.get(
    `/Partner/GetPartner?privateSiteLabel=${siteurl}`,
    { httpsAgent }
  );
  console.log(`partner ${siteurl} fetched`);
  return data;
};

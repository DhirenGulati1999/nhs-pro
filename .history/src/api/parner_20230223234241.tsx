import axios from "src/lib/axios";

export const getParner = async (siteurl: any) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '';
  const { data } = await axios.get(
    `/Partner/GetPartner?privateSiteLabel=${siteurl}`
  );
  console.log(`partner ${siteurl} fetched`);
  return data;
};

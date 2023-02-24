import axios from "src/lib/axios";

export const getParner = async (siteurl: any) => {
  const { data } = await axios.get(
    `/Partner/GetPartner?privateSiteLabel=${siteurl}`
  );
  console.log(`partner ${siteurl} fetched`);
  return data;
};

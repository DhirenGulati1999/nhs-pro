import axios from "src/lib/axios";

export const getParner = async (siteurl: string) => {
  const { data } = await axios.get(`/Partner/GetPartner?privateSiteLabel=${siteurl}`);
  console.log(`post ${siteurl} fetched`);
  return data;
};

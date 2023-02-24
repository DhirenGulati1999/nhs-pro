import axios from "src/lib/axios";

export const getParner = async (siteurl: any) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "";
  const { data } = await axios.get(`Detail/Partners?partnerid=88`);
  console.log(`partner ${siteurl} fetched`);
  return data;
};

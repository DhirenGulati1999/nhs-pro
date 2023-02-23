import axios from "src/lib/axios";

export const getParner = async (siteurl: string) => {
  const { data } = await axios.get(`/partner/${siteurl}`);
  console.log(`post ${siteurl} fetched`);
  return data;
};

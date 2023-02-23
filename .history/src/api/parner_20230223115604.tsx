import axios from "lib/axios";

export const getParner = async (siteurl: string) => {
  const { data } = await axios.get(`/partner/${}`);
  console.log(`post ${siteurl} fetched`);
  return data;
};

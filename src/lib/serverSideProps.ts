import { getPartner } from "@/api/parner";

export const getGlobalPageProps = async (context: any) => {
  const privateLabel = context?.router?.query?.privateLabel ?? "";
  let isError = false;
  let data = null;
  try {
    data = await getPartner(privateLabel);
    console.log("Partner....", data);
} catch (error: any) {
    isError = true;
  }

  return {
    isError,
    partner: data,
  };
};

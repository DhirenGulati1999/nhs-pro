import { getPartner } from "@/api/parner";

export const getGlobalPageProps = async (params: any) => {
    console.log("params....",params);
  const privateLabel = params?.privateLabel ?? "";
  let isError = false;
  let data = null;
  try {
    data = await getPartner(privateLabel);
} catch (error: any) {
    isError = true;
  }

  return {
    isError,
    partner: data,
  };
};

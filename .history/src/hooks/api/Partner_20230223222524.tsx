import { useQuery } from "@tanstack/react-query";
import * as api from "src/api/parner";

export const usePartner = (siteUrl: string) => {
  return useQuery(["privateSiteLabel", siteUrl], () => api.getParner(siteUrl));
};

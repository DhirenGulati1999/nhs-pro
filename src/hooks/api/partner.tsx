import { Partner } from "@/interfaces/partner";
import { useQuery, UseQueryResult} from "@tanstack/react-query";
import * as api from "src/api/parner";

export const usePartner = (siteUrl: any): UseQueryResult<Partner> => {
  return useQuery(["privateSiteLabel", siteUrl], () => api.getParner(siteUrl));
};

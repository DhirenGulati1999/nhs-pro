import { useQuery } from "@tanstack/react-query";
import * as api from "src/api/parner";

export const usePost = (siteUrl: string) => {
  return useQuery(["post", siteUrl], () => api.getParner(siteUrl), {
    staleTime: 10,
  });
};

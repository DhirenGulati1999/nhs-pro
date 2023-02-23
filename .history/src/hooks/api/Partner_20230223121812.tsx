import { useQuery } from "@tanstack/react-query";
import * as api from "src/api/parner";

export const usePost = (id: number) => {
  return useQuery(["post", id], () => api.getParner(site), {
    staleTime: 10,
  });
};

import { useQuery } from "@tanstack/react-query";
import * as api from "src/api/partner";

export const usePost = (id: number) => {
  return useQuery(["post", id], () => api.getPost(id), {
    staleTime: 10,
  });
};

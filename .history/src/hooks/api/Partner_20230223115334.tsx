import { useQuery } from "@tanstack/react-query";
import * as api from "api/partner";

export const usePost = (id) => {
  return useQuery(["post", id], () => api.getPost(id), {
    staleTime: 10,
  });
};

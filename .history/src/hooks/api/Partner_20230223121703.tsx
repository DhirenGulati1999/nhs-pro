import { useQuery } from "@tanstack/react-query";
import * as api from "/BHIConfig";

export const usePost = (id: number) => {
  return useQuery(["post", id], () => api.getPost(id), {
    staleTime: 10,
  });
};

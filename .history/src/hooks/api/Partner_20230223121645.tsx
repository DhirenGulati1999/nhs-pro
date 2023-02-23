import { useQuery } from "@tanstack/react-query";
import * as api from "../api";

export const usePost = (id: number) => {
  return useQuery(["post", id], () => api.getPost(id), {
    staleTime: 10,
  });
};

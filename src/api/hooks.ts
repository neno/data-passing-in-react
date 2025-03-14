import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./users.api";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./users.api";
import { Users } from "@/types/user.types";
import { UserRow } from "@/types/user.types";
import { mapUserToUserRow } from "@/lib/utils";

export const useUsers = <T = Users>(select?: (data: Users) => T) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    select,
  });
};

export const useUsersList = () => {
  return useUsers<UserRow[]>((data) => data.map(mapUserToUserRow));
};

export const useUserDetails = (id: number) => {
  const user = useUsers((data) => data.find((user) => user.id === id));
  return user;
};

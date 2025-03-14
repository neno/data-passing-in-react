import { Users } from "@/types/user.types";

export const fetchUsers = async (): Promise<Users> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
};

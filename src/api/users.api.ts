import axios from "axios";
import { Users } from "@/types/user.types";

const usersApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchUsers = async (): Promise<Users> => {
  const response = await usersApi.get("/users");
  return response.data;
};

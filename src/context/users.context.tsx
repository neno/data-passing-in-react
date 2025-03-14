import { User } from "@/types/user.types";
import { createContext } from "react";

export const UsersContext = createContext<{
  fetchUserDatails: (id: number) => User | undefined;
} | null>(null);

import { User } from "@/types/user.types";
import { UserRow } from "@/types/user.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapUserToUserRow(user: User): UserRow {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
  };
}

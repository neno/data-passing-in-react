import { User } from "@/types/user.types";
import { ColumnDef } from "@tanstack/react-table";
import { UserDetails } from "./user-details";

export const usersColumns: ColumnDef<Partial<User>>[] = [
  {
    header: "name",
    accessorKey: "name",
  },
  {
    header: "email",
    accessorKey: "email",
  },
  {
    header: "phone",
    accessorKey: "phone",
  },
  {
    header: "id",
    accessorKey: "id",
    cell: ({ row }) => {
      return <UserDetails user={row.original} />;
    },
  },
];

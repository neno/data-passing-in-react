import { useUsersList } from "@/api/hooks";
import { UsersTable } from "./users.table";

export function Users() {
  const { data } = useUsersList();
  if (!data) return <div>Loading...</div>;
  return <UsersTable data={data} />;
}

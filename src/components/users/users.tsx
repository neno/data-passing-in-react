import { useUsers } from "@/api/hooks";
import { UsersTable } from "./users.table";
import { mapUserToUserRow } from "@/lib/utils";
import { UsersContext } from "@/context/users.context";

export function Users() {
  const { data } = useUsers();
  if (!data) {
    return null;
  }
  const userRows = data.map(mapUserToUserRow);
  if (!data) return <div>Loading...</div>;

  const fetchUserDatails = (id: number) => {
    console.log("fetchUserDatails", id);
    const user = data?.find((user) => user.id === id);
    return user;
  };

  return (
    <UsersContext.Provider value={{ fetchUserDatails }}>
      <UsersTable data={userRows} />
    </UsersContext.Provider>
  );
}

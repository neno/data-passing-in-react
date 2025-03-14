import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { User as UserIcon } from "lucide-react";

import { UsersContext } from "@/context/users.context";
import { use } from "react";

export function UserDetails({ id }: { id: number }) {
  const usersContext = use(UsersContext);
  const data = usersContext?.fetchUserDatails(id);
  console.log("fetchUserDatails", data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details {id}</DialogTitle>
        </DialogHeader>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { User as UserIcon } from "lucide-react";
import { User } from "@/types/user.types";
export function UserDetails({ user }: { user: Partial<User> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details {user.id}</DialogTitle>
        </DialogHeader>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </DialogContent>
    </Dialog>
  );
}

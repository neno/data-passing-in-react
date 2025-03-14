import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { User as UserIcon } from "lucide-react";
import { useUserDetails } from "@/api/hooks";

export function UserDetails({ id }: { id: number }) {
  const { data } = useUserDetails(id);

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

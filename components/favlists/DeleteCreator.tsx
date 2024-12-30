import React, { useState } from "react";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
const DeleteCreator = ({
  id,
  queryName,
  from,
  creator,
}: {
  id: string;
  queryName?: string;
  from: "LIST" | "PROJECT";
  creator: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    let query = `lists/${id}/creators`;
    if (from === "PROJECT") {
      query = `/projects/steps/${id}/creators`;
    }

    setOpen(false);
    try {
      const res = await api.delete(query, {
        data: {
          creators: [creator],
        },
      });
      console.log(res);
      queryClient.invalidateQueries({ queryKey: [queryName] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            className="bg-red-500 text-white hover:bg-red-500"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px] bg-darkColor">
          <DialogHeader>
            <DialogTitle className="mb-5">Delete Creator</DialogTitle>
            <DialogDescription className="text-sm my-5">
              Are you sure you want to delete this creator ? This action is
              irreversible and will permanently delete all data associated with
              this creator. Please confirm if you wish to proceed.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>

            <Button
              type="submit"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteCreator;

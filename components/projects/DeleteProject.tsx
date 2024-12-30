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
import { useRouter } from "next/navigation";
const DeleteProject = ({id , queryName } : {id : string , queryName : string}) => {
  const [open , setOpen] = useState<boolean>(false)
  const queryClient = useQueryClient();
  const router = useRouter()

  const handleDelete =async () => {

    setOpen(false)
    try {
      const res = await api.delete(`/projects/${id}`)
      console.log(res)
      router.push('/projects')
      queryClient.invalidateQueries({ queryKey: [queryName] });
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-red-500 text-white hover:bg-red-500">
            <Trash className="w-4 h-4" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px] bg-darkColor">
          <DialogHeader>
            <DialogTitle className="mb-5">Delete Projet</DialogTitle>
            <DialogDescription className="text-sm my-5">
              Are you sure you want to delete this project? This action is
              irreversible and will permanently delete all data associated with
              this project. Please confirm if you wish to proceed.
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

export default DeleteProject;

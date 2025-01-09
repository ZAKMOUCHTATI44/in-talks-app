import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Form, Formik } from "formik";
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
import * as Yup from "yup";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import InputWithLabel from "../utils/InputWithLabel";
const ActionStep = ({ id, queryName , name }: { id: string; queryName: string , name : string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size={"icon"}>
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28 bg-darkColor">
        <DropdownMenuLabel>
          <EditStepName id={id} queryName={queryName} name={name} />
        </DropdownMenuLabel>
        <DropdownMenuLabel className="flex items-center">
          <DeleteStep id={id} queryName={queryName} />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionStep;

function EditStepName({ id, queryName  ,name }: { id: string; queryName: string ,name : string }) {
  interface Step {
    name: string;
  }

  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);

  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("le nom est requis"),
  });

  const handleSubmit = async (values: Step) => {
    try {
      await api.put(
        `/step-project/${id}`,
        JSON.stringify(values)
      );
      queryClient.invalidateQueries({ queryKey: [queryName] });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full flex items-center gap-2">
          <Pencil className="w-4 h-4" />
          Edit
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-bgDarkColor">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            name: name,
          }}
          validationSchema={schemaValidation}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, errors }) => (
            <Form className="flex flex-col gap-5 dark:text-whiteColor">
              <DialogHeader>
                <DialogTitle>Add new step</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <InputWithLabel
                  label="Step Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </div>
              <div className="w-full flex justify-center">
                <Button
                  type="submit"
                  className="bg-orange-500 text-white hover:bg-orange-700 w-full"
                >
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

const DeleteStep = ({ id, queryName }: { id: string; queryName: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  // const { toast } = useToast()

  const handleDelete = async () => {
    setOpen(false);
    try {
      const res = await api.delete(`/step-project/${id}`);
      console.log(res);
      queryClient.invalidateQueries({ queryKey: [queryName] });

      // toast({
      //   variant:"default",
      //   title: "Scheduled: Catch up",
      //   description: "Friday, February 10, 2023 at 5:57 PM",
      // })

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="w-full flex items-center gap-2">
            <Trash className="w-4 h-4" />
            Delete
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px] bg-darkColor">
          <DialogHeader>
            <DialogTitle className="mb-5">Delete Step</DialogTitle>
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

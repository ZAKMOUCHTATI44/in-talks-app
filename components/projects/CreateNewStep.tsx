import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import InputWithLabel from "../utils/InputWithLabel";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Step {
  name: string;
}
function CreateNewStep({ id, queryName }: { id: string; queryName: string }) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);

  const schemaValidation = Yup.object().shape({
    name: Yup.string().required("le nom est requis"),
  });

  const handleSubmit = async (values: Step) => {
    try {
      await api.post(
        `/projects/${id}/steps`,
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
        <Button className="bg-green-500 text-white hover:bg-green-400 hover:text-white ">
          Add new step
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-bgDarkColor">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            name: "",
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
                  className="bg-green-500 text-white hover:bg-green-700 w-full"
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

export default CreateNewStep;

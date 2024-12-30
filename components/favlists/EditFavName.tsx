import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import InputWithLabel from "../utils/InputWithLabel";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ProjectRequest {
  name: string;
}
function EditFavName({
  id,
  queryName,
  name,
}: {
  id: string;
  queryName: string;
  name: string;
}) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);

  const projectSchema = Yup.object().shape({
    name: Yup.string().required("le nom est requis"),
  });

  const handleSubmit = async (values: ProjectRequest) => {
    try {
      await api.patch(`/lists/${id}`, JSON.stringify(values));
      queryClient.invalidateQueries({ queryKey: [queryName] });
      setOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-500 text-white hover:bg-gray-600 hover:text-white ">
          Edit Favlist
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-bgDarkColor">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            name,
          }}
          validationSchema={projectSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, errors }) => (
            <Form className="flex flex-col gap-5 dark:text-whiteColor">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <InputWithLabel
                  label="Project Name"
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
                  Edit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default EditFavName;

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
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { Textarea } from "../ui/textarea";

interface FavRequest {
  name: string;
  description: string;
}
function CreateNewFav() {
  const projectSchema = Yup.object().shape({
    name: Yup.string().required("le nom est requis"),
    description: Yup.string().required("template est requis"),
  });

  const handleSubmit = async (values: FavRequest) => {
    console.log(values);

    
    try {
      const res = await api.post("/lists", JSON.stringify(values));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white hover:bg-green-400 hover:text-white ">
          Create new Fav list
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-bgDarkColor">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={projectSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, errors }) => (
            <Form className="flex flex-col gap-5 dark:text-whiteColor">
              <DialogHeader>
                <DialogTitle>Create new fav list</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <InputWithLabel
                  label="List Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Description</Label>
                <div>
                  <Textarea
                    placeholder="description"
                    name="description"
                    onChange={handleChange}
                  />
                  {errors.description && (
                    <span className="text-red-500">
                        {errors.description}
                    </span>
                  )}
                </div>
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

export default CreateNewFav;

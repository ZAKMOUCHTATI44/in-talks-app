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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { Textarea } from "../ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

interface ProjectRequest {
  name: string;
  template: string;
  description?: string;
}
function CreateNewProject({queryName } : {queryName ?: string}) {

  const queryClient = useQueryClient();
  const projectSchema = Yup.object().shape({
    name: Yup.string().required("le nom est requis"),
    template: Yup.string().required("template est requis"),
  });


  const handleSubmit = async (values: ProjectRequest) => {
    try {
      const res = await api.post("/projects", JSON.stringify(values));
      console.log(res)
      if(queryName)  queryClient.invalidateQueries({ queryKey: [queryName] });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white hover:bg-green-400 hover:text-white ">
          Create new Project
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-bgDarkColor">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            name: "",
            template: "",
          }}
          validationSchema={projectSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, handleChange, values, errors }) => (
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

              <Label>Project Template</Label>
              <RadioGroup
                defaultValue="0"
                value={values.template}
                className="grid grid-cols-2"
                onValueChange={(e) => setFieldValue("template", e)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="simple" />
                  <Label htmlFor="simple">Simple</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="advanced" />
                  <Label htmlFor="advanced">Advanced</Label>
                </div>
              </RadioGroup>
              {errors.template && (
                <span className={`text-red-500 text-sm pt-2`}>
                  {errors.template}
                </span>
              )}

              <div className="flex flex-col gap-1.5">
                <Label>Description</Label>
                <Textarea
                  placeholder="description"
                  name="description"
                  onChange={handleChange}
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

export default CreateNewProject;

"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import InputWithLabel from "@/components/utils/InputWithLabel";
import { Button } from "../ui/button";
import Link from "next/link";

interface LoginSchema {
  email: string;
}

const ForgetPassword = ({
  content,
}: {
  content: {
    username: {
      label: string;
      placeholder: string;
      validation: string;
    };
    cta: string;
    createAccount: string;
  };
}) => {
  const forgetSchema = Yup.object().shape({
    email: Yup.string().required(content.username.validation),
  });

  const handleSubmit = (values: LoginSchema) => {
    console.log(values);
  };

  return (
    <Formik
    validateOnChange={false}
    validateOnBlur={false}
    initialValues={{
      email: "",
      password: "",
    }}
    validationSchema={forgetSchema}
    onSubmit={handleSubmit}
  >
    {({ handleChange, values, errors }) => (
      <Form className="flex flex-col gap-5">
        <InputWithLabel
          name="email"
          onChange={handleChange}
          value={values.email}
          label={content.username.label}
          error={errors.email}
        />
        <Button className="bg-mainColor hover:bg-transparent hover:text-mainColor border border-mainColor h-auto py-2">
          Send 
        </Button>
        <div className="flex justify-center">
          <Link
            href={"register"}
            className="text-center text-sm"
            dangerouslySetInnerHTML={{__html :content.createAccount }}
          >
          </Link>
        </div>
      </Form>
    )}
  </Formik>
  )
};

export default ForgetPassword;

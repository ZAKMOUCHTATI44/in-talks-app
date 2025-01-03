"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import InputWithLabel from "@/components/utils/InputWithLabel";
import { Button } from "../ui/button";
import Link from "next/link";
import api from "@/lib/api";
// import { setAuthUser } from "@/lib/authHelper";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useAuthUser } from "@/lib/useAuthUser";
import GoogleProvider from "./GoogleProvider";

interface LoginSchema {
  email: string;
  password: string;
}

const LoginForm = ({
  content,
}: {
  content: {
    username: {
      label: string;
      placeholder: string;
      validation: string;
    };
    password: {
      label: string;
      placeholder: string;
      validation: string;
    };
    cta: string;
    forgetPassword: string;
    createAccount: string;
  };
}) => {
  const router = useRouter();

  const { saveAuthUser } = useAuthUser();
  const loginSchema = Yup.object().shape({
    email: Yup.string().required(content.username.validation),
    password: Yup.string().required(content.password.validation),
  });

  const handleSubmit = async (
    values: LoginSchema,
    { setErrors }: { setErrors: (errors: Record<string, string>) => void }
  ) => {
    try {
      const res = await api.post("/login", {
        username: values.email,
        password: values.password,
      });

      console.log(res);

      saveAuthUser({ ...res.data, email: values.email });
      router.push("/");
    } catch (error) {
      console.log(error)
      setErrors({ email: "Invalid email or password" });
    }
  };

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleChange, values, errors }) => (
        <Form className="flex flex-col gap-5 dark:text-white">
          <InputWithLabel
            name="email"
            onChange={handleChange}
            value={values.email}
            label={content.username.label}
            error={errors.email}
          />
          <InputWithLabel
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            label={content.password.label}
            error={errors.password}
          />
          <div className="text-end">
            <Link
              href={`/forget-password`}
              className="text-sm border-b border-mainColor text-mainColor"
            >
              {content.forgetPassword}
            </Link>
          </div>
          <Button className="bg-mainColor text-white hover:bg-transparent hover:text-mainColor border border-mainColor h-auto py-2">
            {isSubmitting ? (
              <LoaderCircle className="loader-circle animate-spin h-12 w-12" />
            ) : (
              "Login"
            )}
          </Button>

          <GoogleProvider />
          <div className="flex justify-center text-white">
            <Link
              href={"register"}
              className="text-center text-sm"
              dangerouslySetInnerHTML={{ __html: content.createAccount }}
            ></Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

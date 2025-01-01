"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import InputWithLabel from "@/components/utils/InputWithLabel";
import { Button } from "../ui/button";
import Link from "next/link";
import PhoneNumber from "../utils/PhoneNumber";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

interface RegsiterSchema {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  company: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterForm = ({
  content,
}: {
  content: {
    lastName: {
      label: string;
      validation: string;
    };
    firstName: {
      label: string;
      validation: string;
    };
    email: {
      label: string;
      validation: string;
    };
    phone: {
      label: string;
      validation: string;
    };
    company: {
      label: string;
      validation: string;
    };
    cta: string;
    createAccount: string;
  };
}) => {

  const router =useRouter()
  const RegisterValidation = Yup.object().shape({
    firstName: Yup.string().required(content.firstName.validation),
    lastName: Yup.string().required(content.lastName.validation),
    email: Yup.string().required(content.email.validation),
    phone: Yup.string().required(content.phone.validation),
  });

  const handleSubmit = async (values: RegsiterSchema) => {
    try {
      const res = await api.post("/sign-up", {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        phonenumber: values.phone,
        password : values.password,
        // company: values.company,
      });

      router.push(`/login`)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        company: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={RegisterValidation}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values, errors, setFieldValue }) => (
        <Form className="flex flex-col gap-5 text-white">
          <div className="grid grid-cols-2 gap-5">
            <InputWithLabel
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
              label={content.firstName.label}
              error={errors.firstName}
            />
            <InputWithLabel
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
              label={content.lastName.label}
              error={errors.lastName}
            />
          </div>
          <InputWithLabel
            name="email"
            onChange={handleChange}
            value={values.email}
            label={content.email.label}
            error={errors.email}
          />

          <PhoneNumber
            label={content.phone.label}
            onChange={(e) => setFieldValue("phone", e)}
            error={errors.phone}
          />

          <InputWithLabel
            name="company"
            onChange={handleChange}
            value={values.company}
            label={content.company.label}
            error={errors.company}
          />

          <InputWithLabel
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            label={"Password"}
            error={errors.password}
          />
          <InputWithLabel
            type="password"
            name="passwordConfirmation"
            onChange={handleChange}
            value={values.passwordConfirmation}
            label={"Password Confirmation"}
            error={errors.passwordConfirmation}
          />

          <Button className="bg-mainColor text-white hover:bg-transparent hover:text-mainColor border border-mainColor h-auto py-2">
            {content.cta}
          </Button>
          <div className="flex justify-center">
            <Link
              href={"login"}
              className="text-center text-sm"
              dangerouslySetInnerHTML={{ __html: content.createAccount }}
            ></Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;

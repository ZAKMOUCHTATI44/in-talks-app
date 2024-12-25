"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import InputWithLabel from "@/components/utils/InputWithLabel";
import { Button } from "../ui/button";
import Link from "next/link";
import PhoneNumber from "../utils/PhoneNumber";

interface RegsiterSchema {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
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
    cta: string;
    createAccount: string;
  };
}) => {
  const RegisterValidation = Yup.object().shape({
    firstName: Yup.string().required(content.firstName.validation),
    lastName: Yup.string().required(content.lastName.validation),
    email: Yup.string().required(content.email.validation),
    phone: Yup.string().required(content.phone.validation),
  });

  const handleSubmit = (values: RegsiterSchema) => {
    console.log(values);
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
      }}
      validationSchema={RegisterValidation}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values, errors, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
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

          <Button className="bg-mainColor hover:bg-transparent hover:text-mainColor border border-mainColor h-auto py-2">
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

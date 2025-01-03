"use client";
import React from "react";
import InputWithLabel from "../utils/InputWithLabel";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

const Account = () => {
  return (
    <div className="my-5 bg-darkColor rounded-md text-white border border-gray-600 p-5  w-3/4 mx-auto">
      <h2 className="text-center text-xl">Mes informations personnelles</h2>
      <div className="flex flex-col gap-5 mt-12">
        <div className="grid grid-cols-2 gap-5">
          <InputWithLabel
            name="fullName"
            onChange={(e) => console.log(e)}
            label="First Name"
          />
          <InputWithLabel
            name="fullName"
            onChange={(e) => console.log(e)}
            label="Last Name"
          />
        </div>
        <InputWithLabel
          name="email"
          onChange={(e) => console.log(e)}
          label="Email"
        />
        <InputWithLabel
          name="email"
          onChange={(e) => console.log(e)}
          label="Entreprise"
        />
        <InputWithLabel
          name="password"
          type="password"
          onChange={(e) => console.log(e)}
          label="Password"
        />
        <InputWithLabel
          name="password"
          type="password"
          onChange={(e) => console.log(e)}
          label="Password Confirmation"
        />
        <Button
          type="submit"
          className="bg-orange-500 text-white hover:bg-orange-700 w-full"
        >
            <Edit className="h-4 w-4" />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Account;

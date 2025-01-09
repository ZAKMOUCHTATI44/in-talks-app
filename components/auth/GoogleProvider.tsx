import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { signIn } from 'next-auth/react'

const GoogleProvider = () => {
  const callbackUrl=`http://localhost:3000/`
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center flex gap-2 items-center">
        <span className="w-full h-[0.125px] bg-gray-600"></span>
        <span className="spanTitle text-gray-400">Or</span>
        <span className="w-full h-[0.125px] bg-gray-600"></span>
      </div>
      <Button
        onClick={() => signIn('google', { callbackUrl })}
        className="h-auto text-white bg-transparent border border-gray-600 w-full rounded-md flex justify-center items-center px-12 py-2 gap-2 hover:bg-darkColor  hover:opacity-45 duration-300 transition-all ease-in-out"
      >
        <Image
          src={"/icons/google.svg"}
          alt="google icon"
          width={25}
          height={25}
        />
        <span className="text-sm">Continue Avec Google</span>
      </Button>
    </div>
  );
};

export default GoogleProvider;

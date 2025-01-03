import React from "react";
import Link from "next/link";
import Image from "next/image";

const GoogleProvider = () => {
  return (
    <div>
      <div className="text-center flex gap-2 items-center">
        <span className="w-full h-[0.125px] bg-gray-600"></span>
        <span className="spanTitle text-gray-400">Or</span>
        <span className="w-full h-[0.125px] bg-gray-600"></span>
      </div>

      <Link
        href={`https://accounts.google.com/o/oauth2/auth?client_id=1069062738323-hc153kgb719blnj3qm36a8uagvpj94rq&response_type=code&access_type=offline&scope=email%20profile&redirect_uri=https://api.inflauditor.ma/cb/g`}
        className="border border-gray-600 w-full rounded-md flex justify-center items-center px-12 py-3 gap-2 hover:bg-darkColor hover:opacity-85 duration-300 transition-all ease-in-out"
      >
        <Image
          src={"/icons/google.svg"}
          alt="google icon"
          width={25}
          height={25}
        />
        <span className="text-sm">Continue Avec Google</span>
      </Link>
    </div>
  );
};

export default GoogleProvider;

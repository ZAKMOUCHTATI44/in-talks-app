"use client";
import ChangeLang from "@/components/utils/ChangeLang";
import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div>
      <div className="min-h-screen grid grid-cols-5 bg-darkColor text-whiteColor">
        <div className="w-full flex items-center justify-center col-span-3 overflow-hidden bg-gradient-to-r from-mainColor to-secondColor h-screen">
          <Image
            src="/auth/banner.png"
            alt="Login banner"
            width={700}
            height={500}
          />
        </div>
        <div className="col-span-2 flex justify-center px-5 flex-col gap-10 relative">
          <div className=" absolute top-3 right-3">
            <ChangeLang />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

"use client";
import React from "react";
import Image from "next/image";

const Avatar = ({ image, alt }: { image?: string; alt: string }) => {
  return (
    <div>
      {image ? (
        <Image
          src={image ? image : "/avatar.png"}
          alt={alt ?? ""}
          width={25}
          height={25}
          className="rounded-full w-8 h-8"
        />
      ) : (
        <p className="h-8 w-8 bg-mainColor rounded-full flex items-center justify-center text-whiteColor">{alt.charAt(0)}</p>
      )}
    </div>
  );
};

export default Avatar;

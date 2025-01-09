"use client"
import React from "react";
import ChangeLang from "../utils/ChangeLang";
import ModeToggle from "../utils/ModeToggle";
import UserAvatar from "../utils/UserAvatar";
import AutoCompleteFilter from "../account/AutoCompleteFilter";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter()
  return (
    <div className="dark:bg-darkColor bg-white shadow-sm my-5 py-3 px-5 flex justify-between items-center mx-5">
      <AutoCompleteFilter
        type="creators"
        onValueChange={(account) => {
          // console.log(account);
          router.push(`/report/${account.id}`)
        }}
      />
      <div className="flex items-center gap-2">
        <ModeToggle />
        <ChangeLang />
        <UserAvatar />
      </div>
    </div>
  );
};

export default TopBar;

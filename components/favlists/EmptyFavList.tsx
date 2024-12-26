import React from "react";
import { Medal, Search } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
const EmptyFavList = () => {
  return (
    <div className=" flex w-auto items-center justify-center">
      <Command className="py-5 px-2 text-whiteColor bg-bgDarkColor rounded-lg border shadow-md md:w-[450px]">
        <h2>Your CRM is empty</h2>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty className="flex flex-col my-12 items-center px-12 text-center gap-5">
            <div className="text-7xl flex justify-center">🔍</div>
            <p className="text-xl ">Add multiple creators at once!</p>
            <p className="text-sm text-gray-500">
              You can add creators in bulk by selecting them in Search or
              Rankings pages.
            </p>
            <div className="flex gap-3">
              <Button
                className="border text-mainColor border-mainColor"
                variant={"ghost"}
              >
                Add from search
                <Search />
              </Button>
              <Button
                className="border text-mainColor border-mainColor"
                variant={"ghost"}
              >
                Add from rankings
                <Medal />
              </Button>
            </div>
          </CommandEmpty>
        </CommandList>
      </Command>
    </div>
  );
};

export default EmptyFavList;
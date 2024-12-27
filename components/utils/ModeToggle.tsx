"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  // const data = [
  //     {
  //         name:"light",
  //     },
  //     {
  //         name:"dark",
  //     },
  //     {
  //         name:"System"
  //     }

  // ]
  const { setTheme  , theme } = useTheme();

  return (
        <Button
          variant="outline"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          size="icon"
          className="bg-transparent hover:bg-transparent"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent
    //     align="end"
    //     className="dark:bg-darkColor dark:hover:bg-transparent"
    //   >
    //     <DropdownMenuItem
    //       onClick={() => setTheme("light")}
    //       className="bg-darkColor hover:bg-bgDarkColor"
    //     >
    //       <Sun className="h-[1.2rem] w-[1.2rem]" />
    //       Light
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("dark")}>
    //       <Moon className="h-[1.2rem] w-[1.2rem]" />
    //       Dark
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}

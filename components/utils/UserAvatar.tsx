"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { getCurrentAuth } from "@/lib/authHelper";
import Avatar from "./Avatar";
import { useAuthUser } from "@/lib/useAuthUser";
import { ChevronDown, LogOut, User2 } from "lucide-react";
import Link from "next/link";

export default function UserAvatar() {
  // const session = getCurrentAuth()

  const { authUser } = useAuthUser();


  if(! authUser) return (<p> ..... </p>)



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none flex items-center gap-1">
          <Avatar alt={authUser?.name} />
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:bg-bgDarkColor dark:text-whiteColor" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {authUser.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {authUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="text-whiteColor" />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="flex gap-2 items-center">
            <Link href={"/account"}>
            <User2 className="h-4 w-4" />
            Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 items-center">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
 
}

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
import { ChevronDown, LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function UserAvatar() {
  const { data: session } = useSession();



  return (
    <>
      {session && session.user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none flex items-center gap-1">
              <Avatar
                image={session.user.image}
                alt={session.user.name ?? ""}
              />
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 dark:bg-bgDarkColor dark:text-whiteColor"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user.name}
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
            <DropdownMenuItem
              onClick={() => {
                signOut();
              }}
              className="flex gap-2 items-center py-3"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

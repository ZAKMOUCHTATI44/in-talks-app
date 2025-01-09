import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import QueryProvider from "@/components/provider/QueryProvider";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/login");
  } 

  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
};

export default Layout;

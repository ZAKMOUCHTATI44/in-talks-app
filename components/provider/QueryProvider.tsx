"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../dashboard/AppSideBar";
import TopBar from "../dashboard/TopBar";
import { useSession } from "next-auth/react";
import { setAuthToken } from "@/lib/api";
import { Toaster } from "@/components/ui/toaster"

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const { data: session } = useSession();

  if (session && session.user) {
    setAuthToken(session.user.accessToken);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="dark:bg-bgDarkColor dark:text-whiteColor"
        suppressHydrationWarning
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="dark:bg-bgDarkColor bg-[#f8f7fa] w-full min-h-screen flex flex-col">
            <TopBar />
            <div
              className="dark:bg-bgDarkColor bg-[#f8f7fa]"
              style={{ height: "-webkit-fill-available" }}
            >
              {children}
              <Toaster />
            </div>
          </main>
        </SidebarProvider>
      </div>
    </QueryClientProvider>
  );
};

export default QueryProvider;

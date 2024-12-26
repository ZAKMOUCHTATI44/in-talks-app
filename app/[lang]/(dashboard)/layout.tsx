"use client";
import AppSideBar from "@/components/dashboard/AppSideBar";
import TopBar from "@/components/dashboard/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuthUser } from "@/lib/useAuthUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  const { authUser, loading } = useAuthUser();

  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.push("/login");
      }
    }
  }, [router, authUser, loading]);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="dark:bg-bgDarkColor dark:text-whiteColor"
        suppressHydrationWarning
      >
        <SidebarProvider>
          <AppSideBar />
          <main className="dark:bg-bgDarkColor bg-[#f8f7fa] px-5 w-full h-screen flex flex-col">
            <TopBar />
            <div
              className="dark:bg-bgDarkColor bg-[#f8f7fa]"
              style={{ height: "-webkit-fill-available" }}
            >
              {children}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </QueryClientProvider>
  );
};

export default Layout;

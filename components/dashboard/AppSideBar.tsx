"use client";
import {
  FolderKanban,
  Headphones,
  Heart,
  Home,
  LogOut,
  MessageCircleQuestion,
  Search,
  TrendingUp,
} from "lucide-react";
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Locale } from "@/i18n.config";
import { logout } from "@/lib/authHelper";
import Link from "next/link";

export default function AppSidebar() {
  const { lang }: { lang: Locale } = useParams();
  const router = useRouter()

  const items = [
    {
      title: lang === "fr" ? "Tableau de bord" : "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: lang === "fr" ? "Influencers" : "Influencers",
      url: "discovery",
      icon: Search,
    },
    {
      title: lang === "fr" ? "Projects" : "Projects",
      url: "projects",
      icon: FolderKanban,
    },
    {
      title: lang === "fr" ? "Classement" : "Ranking",
      url: "#",
      icon: TrendingUp,
    },
    {
      title: lang === "fr" ? "Écoute sociale" : "Social Listening",
      url: "#",
      icon: MessageCircleQuestion,
    },
    {
      title: lang === "fr" ? "Favoris" : "Favorites",
      url: "#",
      icon: Heart,
    },
    {
      title: lang === "fr" ? "Support" : "Support",
      url: "#",
      icon: Headphones,
    },
  ];
  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarContent className=" dark:bg-[#2F3349] dark:text-whiteColor text-[#2F3349]  shadow-sm">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden" >
          <Image
            className="py-2"
            src={"/logo.png"}
            alt="In Talks logo"
            width={150}
            height={50}
          />
          <SidebarGroupLabel className="mt-5 dark:text-whiteColor text-[#2F3349]">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="py-1">
                  <SidebarMenuButton asChild className="hover:bg-[#ff55e3]">
                    <Link
                      href={item.url}
                      className="!py-5 flex justify-center hover:bg-[#ff55e3] hover:text-black dark:hover:text-white relative"
                    >
                      <item.icon className="!w-5 !h-5" />
                      {/* <p className="text-base absolute bg-white">{item.title}</p> */}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem className="py-1">
                <SidebarMenuButton asChild  className="hover:bg-[#ff55e3]">
                  <a
                    href={"#"}
                    onClick={() => {
                      logout();
                      router.push('/login')
                    }}
                    className="!py-5 hover:bg-[#ff55e3] flex justify-center hover:text-black dark:hover:text-white"
                  >
                    <LogOut className="!w-5 !h-5" />
                    {/* <p className="text-base">Se déconnecter</p> */}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

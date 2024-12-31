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
import { useParams, usePathname, useRouter } from "next/navigation";
import { Locale } from "@/i18n.config";
import { logout } from "@/lib/authHelper";
import Link from "next/link";

export default function AppSidebar() {
  const { lang }: { lang: Locale } = useParams();
  const router = useRouter();
  const pathname = usePathname();

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
      url: "ranking",
      icon: TrendingUp,
    },
    {
      title: lang === "fr" ? "Écoute sociale" : "Social Listening",
      url: "#",
      icon: MessageCircleQuestion,
    },
    {
      title: lang === "fr" ? "Favoris" : "Favorites",
      url: "favoris",
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
      <SidebarContent className="bg-white dark:bg-[#2F3349] dark:text-whiteColor text-[#2F3349]  shadow-sm">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <Image
            className="py-2"
            src={"/in-talks.png"}
            alt="In Talks logo"
            width={150}
            height={50}
          />
          <SidebarGroupLabel className="mt-5 dark:text-whiteColor text-[#2F2B3DAD]">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="py-1">
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-[#ff55e3] text-[#2F2B3DAD] dark:text-whiteColor"
                  >
                    <Link
                      href={`/${item.url}`}
                      // className="!py-5 flex hover:bg-[#ff55e3 hover:text-white relative"
                      className={`link ${
                        `${pathname}` === `/${lang}/${item.url}`
                          ? "bg-mainColor text-white"
                          : ""
                      } py-5 hover:bg-bgDarkColor mx-1 rounded-md transition-all ease-out duration-700  flex justify-start items-center gap-2 hover:bg-[#ff55e3 hover:text-white relative `}
                    >
                      <item.icon className="!w-5 !h-5" />
                      <p className="text-sm">{item.title}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem className="py-1">
                <SidebarMenuButton asChild className="hover:bg-[#ff55e3]">
                  <a
                    href={"#"}
                    onClick={() => {
                      logout();
                      router.push("/login");
                    }}
                    className="!py-5 hover:bg-[#ff55e3] flex hover:text-white text-[#2F2B3DAD] dark:text-whiteColor"
                  >
                    <LogOut className="!w-5 !h-5" />
                    <p className="text-sm">Se déconnecter</p>
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

// import React from "react";
// import {
//   FolderKanban,
//   Headphones,
//   Heart,
//   Home,
//   LogOut,
//   MessageCircleQuestion,
//   Search,
//   TrendingUp,
// } from "lucide-react";
// import { Locale } from "@/i18n.config";
// import { useParams, usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { logout } from "@/lib/authHelper";
// const AppSideBar = () => {
//   const { lang }: { lang: Locale } = useParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   const items = [
//     {
//       title: lang === "fr" ? "Tableau de bord" : "Dashboard",
//       url: "/",
//       icon: Home,
//     },
//     {
//       title: lang === "fr" ? "Influencers" : "Influencers",
//       url: "/discovery",
//       icon: Search,
//     },
//     {
//       title: lang === "fr" ? "Projects" : "Projects",
//       url: "/projects",
//       icon: FolderKanban,
//     },
//     {
//       title: lang === "fr" ? "Classement" : "Ranking",
//       url: "/ranking",
//       icon: TrendingUp,
//     },
//     {
//       title: lang === "fr" ? "Écoute sociale" : "Social Listening",
//       url: "/social-listening",
//       icon: MessageCircleQuestion,
//     },
//     {
//       title: lang === "fr" ? "Favoris" : "Favorites",
//       url: "/favoris",
//       icon: Heart,
//     },
//     {
//       title: lang === "fr" ? "Support" : "Support",
//       url: "#",
//       icon: Headphones,
//     },
//   ];
//   return (
//     <div className="h-screen sticky top-0 sidebar w-16 transition-all ease-out duration-300 flex flex-col gap-2 bg-darkColor">
//       <Image
//         className="py-2"
//         src={"/logo.png"}
//         alt="In Talks logo"
//         width={150}
//         height={50}
//       />
//       <div>
//         <p className="mt-5 text-center dark:text-whiteColor text-sm text-[#2F2B3DAD] pb-5">
//           Menu
//         </p>

//         <ul className="flex flex-col gap-2 ">
//           {items.map((item) => (
//             <li key={item.title}>
//               <Link
//                 href={item.url}
//                 className={`link ${
//                   `${pathname}` === `/${lang}/${item.url}` ? "bg-mainColor" : ""
//                 } py-4 hover:bg-bgDarkColor mx-1 rounded-md transition-all ease-out duration-700  flex justify-center items-center gap-2 hover:bg-[#ff55e3 hover:text-white relative `}
//               >
//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <>
//                       <item.icon className="!w-5 !h-5" />

//                       </>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>{item.title}</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               </Link>
//             </li>
//           ))}
//           <li
//             onClick={() => {
//               logout();
//               router.push("/login");
//             }}
//             className="py-4 hover:bg-bgDarkColor mx-1 rounded-md transition-all ease-out duration-700  flex justify-center items-center gap-2 hover:bg-[#ff55e3 hover:text-white relative"
//           >
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <LogOut className="!w-5 !h-5" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Se déconnecter</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AppSideBar;

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyFavList from "@/components/favlists/EmptyFavList";

const Page = () => {
  return (
    <Tabs defaultValue="fav-lists" className="bg-darkColor min-h-[85vh]">
      <TabsList className="grid w-full grid-cols-2 bg-darkColor">
        <TabsTrigger className="bg-darkColor" value="fav-lists">
          Fav lists
        </TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
      </TabsList>
      <TabsContent value="fav-lists" className="min-h-[85vh] flex items-center justify-center">
        <EmptyFavList />
      </TabsContent>
      <TabsContent value="projects">Projects</TabsContent>
    </Tabs>
  );
};

export default Page;

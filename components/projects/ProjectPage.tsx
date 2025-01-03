"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import Error from "../utils/Error";
import api from "@/lib/api";
import Loading from "../utils/Loading";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {  Search } from "lucide-react";
import EmptyFavList from "../favlists/EmptyFavList";
import CreateNewProject from "./CreateNewProject";
import CardProject from "./CardProject";

interface Pagination {
  data: Project[];
  count: number;
}
const ProjectPage = () => {
  const queryBuilder = () => {
    const query = "projects";
    return query;
  };

  const fetch = (): Promise<Pagination> =>
    api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: ["projects", queryBuilder()],
    queryFn: fetch,
  });

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  return (
    <div className="w-full ">
      <div className="flex gap-2 py-5">
        <Input
          placeholder="Search"
          className="border border-gray-600 col-span-2"
        />
        <Button className="bg-mainColor text-white hover:bg-mainColor hover:text-white">
          Search
          <Search />
        </Button>
        <CreateNewProject queryName={queryBuilder()} />
      </div>
      <div className="grid grid-cols-3 gap-2 py-5 ">
        {data &&
          data.data &&
          data.data.length > 0 &&
          data.data.map((project) => <CardProject key={project.id} project={project} />)}

        {data && data.data && data.data.length === 0 &&  (
            <div className="w-full flex items-center justify-center col-span-3">
                <EmptyFavList />
            </div>
        )}  
      </div>
    </div>
  );
};


export default ProjectPage
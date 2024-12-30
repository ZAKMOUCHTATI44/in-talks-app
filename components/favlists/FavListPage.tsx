"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import Error from "../utils/Error";
import api from "@/lib/api";
import Loading from "../utils/Loading";
import FavListCard from "./FavListCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import EmptyFavList from "../favlists/EmptyFavList";
import CreateNewFav from "../favlists/CreateNewFav";

interface Pagination {
  data: FavList[];
  count: number;
}
const FavListPage = () => {
  const queryBuilder = () => {
    let query = "lists";
    return query;
  };

  const fetch = (): Promise<Pagination> =>
    api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: ["favlists", queryBuilder()],
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
        <CreateNewFav />
      </div>
      <div className="grid grid-cols-3 gap-2 py-5 ">
        {data &&
          data.data &&
          data.data.length > 0 &&
          data.data.map((fav) => <FavListCard key={fav.id} fav={fav} />)}

        {data && data.data && data.data.length === 0 &&  (
            <div className="w-full flex items-center justify-center col-span-3">
                <EmptyFavList />
            </div>
        )}  
      </div>
    </div>
  );
};

export default FavListPage;

"use client";
import DataTableInfluencersRanking from "@/components/ranking/DataTableInfluencersRanking";
import FilterRanking from "@/components/ranking/FilterRanking";
import Error from "@/components/utils/Error";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";

interface Pagination {
  data: Account[];
  total: number,
  perPage: number,
  currentPage: number,
  lastPage: number,
  nextPage: number,
  prevPage: number
}

const Page = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const networks = searchParams.get("networks"),
    gender = searchParams.get("gender"),
    page = searchParams.get("page"),
    category = searchParams.get("category");

  const queryBuilder = () => {
    let query = "accounts?limit=200";
    if (networks) query += `&network=${networks}`;
    if (category) query += `&category=${category}`;
    // if (niche) query += `&category=${niche}`;
    if (gender) query += `&gender=${gender}`;
    if (page) query += `&page=${page}`;
    return query;
  };

  const fetch = (): Promise<Pagination> =>
    api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: [queryBuilder()],
    queryFn: fetch,
    enabled :!! session?.user.accessToken
  });

  if (error) return <Error />;

  return (
    <div>
      <div className="flex flex-col gap-5 px-5">
        <FilterRanking />
        {data && <DataTableInfluencersRanking isLoading={isLoading} data={data} />}
      </div>
    </div>
  );
};

export default Page;

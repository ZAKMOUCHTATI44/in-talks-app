"use client";
import DataTableInfluencersRanking from "@/components/ranking/DataTableInfluencersRanking";
import FilterRanking from "@/components/ranking/FilterRanking";
import Error from "@/components/utils/Error";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";

interface Pagination {
  data: Account[];
  cursor: {
    total: number;
    page: number;
    count: number;
  };
}

const Page = () => {
  const searchParams = useSearchParams();
  const networks = searchParams.get("networks"),
    gender = searchParams.get("gender"),
    page = searchParams.get("page"),
    niche = searchParams.get("niche"),
    category = searchParams.get("category");

  const queryBuilder = () => {
    let query = "creators/ranking?limit=12&sort=rank";

    if (networks) query += `&networks=${networks}`;
    if (category) query += `&category=${niche}`;
    // if (niche) query += `&category=${niche}`;
    if (gender) query += `&gender=${gender}`;
    if (page) query += `&page=${page}`;

    return query;
  };

  const fetch = (): Promise<Pagination> =>
    api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: ["creators-ranking", queryBuilder()],
    queryFn: fetch,
  });

  if (error) return <Error />;

  return (
    <div>
      <div className="flex flex-col gap-5">
        <FilterRanking />
        {data && <DataTableInfluencersRanking isLoading={isLoading} data={data} />}
      </div>
    </div>
  );
};

export default Page;

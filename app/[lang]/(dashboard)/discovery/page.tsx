"use client";
import CardAccount from "@/components/discovery/CardAccount";
import FilterDiscovery from "@/components/discovery/FilterDiscovery";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { formatNumber } from "@/lib/number";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

import OrderBy from "@/components/discovery/filters/OrderBy";
import { useSearchParams } from "next/navigation";
import PaginationDiscovery from "@/components/discovery/PaginationDiscovery";
import Error from "@/components/utils/Error";
interface Pagination {
  data: Account[];
  cursor: {
    total: number;
    page: number;
    count: 12;
  };
}

interface FilterDiscovery {
  sort: string;
  networks: string;
  range: string;
  category: string;
  gender: string;
  country: string;
  type: string;
}

const Page = () => {
  const searchParams = useSearchParams();

  const queryBuilder = () => {
    let query = "creators/search?limit=12";
    const sort = searchParams.get("sort"),
      networks = searchParams.get("networks"),
      range = searchParams.get("range"),
      gender = searchParams.get("gender"),
      country = searchParams.get("country"),
      type = searchParams.get("type"),
      page = searchParams.get("page");

    if (sort) query += `&sort=${sort}`;
    if (networks) query += `&networks=${networks}`;
    if (range) query += `&range=${range}`;
    if (gender) query += `&gender=${gender}`;
    if (country) query += `&country=${country}`;
    if (type) query += `&type=${type}`;
    if (page) query += `&page=${page}`;

    return query;
  };

  const fetch = (): Promise<Pagination> =>
    api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: ["creators-search", queryBuilder()],
    queryFn: fetch,
  });

  if (error) return <Error />;

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-3 mt-16 h-screen sticky top-5">
        <FilterDiscovery />
      </div>
      <div className="col-span-9 pb-12">
        {isLoading && <Loading />}
        {data && (
          <>
            <div className="flex justify-between items-center h-16">
              <p>{formatNumber(data?.cursor.total)} results</p>
              <OrderBy />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {data &&
                data.data.length > 0 &&
                data.data.map((item) => (
                  <CardAccount account={item} key={item.id} />
                ))}
            </div>
            <PaginationDiscovery
              totalPage={Math.round(data.cursor.total / data.cursor.count)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;

"use client";
import CardAccount from "@/components/discovery/CardAccount";
import FilterDiscovery from "@/components/discovery/FilterDiscovery";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { formatNumber } from "@/lib/number";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";

import OrderBy from "@/components/discovery/filters/OrderBy";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationDiscovery from "@/components/discovery/PaginationDiscovery";
import Error from "@/components/utils/Error";
import { useQueryHelper } from "@/components/utils/queryHelpers";
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
  const { createQueryString } = useQueryHelper();
  const router = useRouter();

  const searchParams = useSearchParams();
  const sort = searchParams.get("sort"),
    networks = searchParams.get("networks"),
    range = searchParams.get("range"),
    gender = searchParams.get("gender"),
    country = searchParams.get("country"),
    type = searchParams.get("type"),
    page = searchParams.get("page"),
    niche = searchParams.get("niche"),
    category = searchParams.get("category");

  const queryBuilder = () => {
    let query = "creators/search?limit=12";

    if (sort !== "0") query += `&sort=${sort}`;
    if (networks) query += `&networks=${networks}`;
    if (networks) query += `&networks=${networks}`;
    if (category && !niche) query += `&category=${niche}`;
    if (niche) query += `&category=${niche}`;
    if (range) query += `&range=${range}`;
    if (gender) query += `&gender=${gender}`;
    if (country) query += `&country=${country}`;
    if (type) query += `&type=${type}`;
    if (page) query += `&page=${page}`;

    return query;
  };

  useEffect(() => {
    const updatedQuery = createQueryString("page", "1");
    router.push(`?${updatedQuery}`);
  }, [sort, networks, range, gender, country, type, niche]);

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
            <div className="grid grid-cols-3 gap-5">
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

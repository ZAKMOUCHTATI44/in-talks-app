"use client";
import CardAccount from "@/components/discovery/CardAccount";
import FilterDiscovery from "@/components/discovery/FilterDiscovery";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { formatNumber } from "@/lib/number";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import OrderBy from "@/components/discovery/filters/OrderBy";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationDiscovery from "@/components/discovery/PaginationDiscovery";
import Error from "@/components/utils/Error";
import { useQueryHelper } from "@/components/utils/queryHelpers";
import { Check, RotateCcw } from "lucide-react";
import { BASE_URL } from "@/lib/hepler";
import ManageFavoritesDiscovery from "@/components/discovery/ManageFavoritesDiscovery";
import ManageProjectsDiscovery from "@/components/discovery/ManageProjectsDiscovery";

interface Pagination {
  data: Account[];
  cursor: {
    total: number;
    page: number;
    count: number;
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
  const [selectedInfluencers, setSelectedInfluencers] = useState<Set<Account>>(
    new Set()
  );

  const objectExists = (id: string): boolean => {
    const influencersArray = Array.from(selectedInfluencers);
    for (const obj of influencersArray) {
      if (obj.id === id) return true;
    }
    return false;
  };

  const selectedAll = () => {
    data?.data.map((influencer) => {
      setSelectedInfluencers((prevSet) => new Set(prevSet).add(influencer));
    });
  };
  const clearSet = () => {
    setSelectedInfluencers(new Set()); // Replace with a new empty Set
  };

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
    if (type === "brands") {
      query = `brands/search?limit=12`;
    }

    if (sort !== "0") query += `&sort=${sort}`;
    if (networks) query += `&networks=${networks}`;
    if (category && !niche) query += `&category=${niche}`;
    if (niche) query += `&category=${niche}`;
    if (range) query += `&range=${range}`;
    if (gender) query += `&gender=${gender}`;
    if (country) query += `&country=${country}`;
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
                  <CardAccount
                    selected={objectExists(item.id)}
                    setSelectAccount={(influencer) => {
                      setSelectedInfluencers((prevSet) => {
                        const newSet = new Set(prevSet);
                        if (newSet.has(influencer)) {
                          newSet.delete(influencer);
                        } else {
                          newSet.add(influencer);
                        }

                        return newSet;
                      });
                    }}
                    account={item}
                    key={item.id}
                  />
                ))}

              {selectedInfluencers.size > 0 && (
                <SelectedInfluencers
                  selectedInfluencers={selectedInfluencers}
                  selectedAll={selectedAll}
                  clearSet={clearSet}
                />
              )}
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

const SelectedInfluencers = ({
  selectedInfluencers,
  selectedAll,
  clearSet,
}: {
  selectedInfluencers: Set<Account>;
  selectedAll: () => void;
  clearSet: () => void;
}) => {
  return (
    <div className="fixed bg-darkColor rounded-lg min-w-[950px] p-3 w-fit shadow-lg bottom-[75px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="border border-gray-600 rounded-lg flex items-center gap-1 px-5 py-1 text-sm">
          {Array.from(selectedInfluencers)
            .slice(0, 4)
            .map((influencer, index) => (
              <div key={index}>
                <div
                  className="rounded-full h-[35px] w-[35px] mx-auto flex justify-start ml-[-15px]"
                  style={{
                    background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                  }}
                >
                  <div
                    className="rounded-full mx-auto w-[34px] h-[34px] bg-contain p-0.5"
                    style={{
                      backgroundImage: `url(${BASE_URL}/media/account?id=${influencer.insights.top.id})`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          {selectedInfluencers.size} creator
        </button>

        <button
        className=" flex items-center gap-2 px-3 py-1 bg-darkColor text-sm rounded-md text-whiteColor border border-gray-600 hover:bg-darkColor hover:opacity-80"
        onClick={selectedAll}
        >
          Select All 12 creator
          <Check className="w-4 h-4" />
        </button>

        <button
        className=" flex items-center gap-2 px-3 py-1 bg-darkColor text-sm rounded-md text-whiteColor border border-gray-600 hover:bg-darkColor hover:opacity-80"
          // className="border border-gray-300 text-primary rounded-lg flex items-center gap-2 px-3 py-1 text-sm"
        
          onClick={clearSet}
        >
          Clear All
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <ManageFavoritesDiscovery clearSet={clearSet} selectedInfluencers={selectedInfluencers} />
        <ManageProjectsDiscovery clearSet={clearSet} selectedInfluencers={selectedInfluencers} />
      </div>
      {/* <ManageFavorites selectedInfluencers={selectedInfluencers} clearSet={clearSet} /> */}
    </div>
  );
};
export default Page;

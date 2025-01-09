"use client";
import React from "react";
import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import DataTableFavlists from "@/components/favlists/DataTableFavlists";
import EditFavName from "@/components/favlists/EditFavName";
import DeleteFavList from "@/components/favlists/DeleteFavList";
import EmptyFavList from "@/components/favlists/EmptyFavList";
import { useSession } from "next-auth/react";

interface Pagination {
  id: string;
  name: string;
  description: string;
  accountsCount : string
  accounts: Account[];
  pictures: string[];
}

const Page = ({ params }: { params: { id: string } }) => {
  const buildQueryString = () => `/favorites/${params.id}`;

  const { data: session } = useSession();


  const fetch = (): Promise<Pagination> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!params.id && !!session?.user.accessToken,

  });

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  return (
    <div>
      {data && (
        <div className="px-5">
          <div className="flex justify-between items-center p-5">
            <div>
              <h1 className="text-2xl font-bold">{data?.name}</h1>
              <p>
                {data.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <EditFavName
                id={params.id}
                queryName={buildQueryString()}
                name={data.name}
              />

              <DeleteFavList id={params.id} queryName={buildQueryString()} />
            </div>
          </div>
          {data.accounts && data.accounts.length > 0 ? (
              <DataTableFavlists data={data.accounts} id={params.id} queryName={buildQueryString()}  />
          ) : (
            <div className="my-24">
                <EmptyFavList />
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Page;

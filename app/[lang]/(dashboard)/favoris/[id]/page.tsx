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

interface Pagination {
  id: string;
  label: string;
  creators: Account[];
}

const Page = ({ params }: { params: { id: string } }) => {
  const buildQueryString = () => `/lists/${params.id}`;

  const fetch = (): Promise<Pagination> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!params.id,
  });

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  return (
    <div>
      {data && (
        <div>
          <div className="flex justify-between items-center p-5">
            <div>
              <h1 className="text-2xl font-bold">{data?.label}</h1>
            </div>
            <div className="flex items-center gap-2">
              <EditFavName
                id={params.id}
                queryName={buildQueryString()}
                name={data.label}
              />

              <DeleteFavList id={params.id} queryName={buildQueryString()} />

              {/* <EditProjectNae
                id={id}
                queryName={buildQueryString()}
                name={data.label}
                description={data.description}
              />
              <CreateNewStep id={id} queryName={buildQueryString()} />
              <DeleteProject id={id} queryName={buildQueryString()} /> */}
            </div>
          </div>

          {data.creators.length > 0 ? (
              <DataTableFavlists data={data.creators} id={params.id} queryName={buildQueryString()}  />
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

import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import FollowerCredibilty from "./FollowerCredibilty";
import AgeSplit from "./AgeSplit";
import GenderSplit from "./GenderSplit";

interface Data {
  data: string;
}

const AudienceGraph = ({ id }: { id: string }) => {
  const buildQueryString = (): string => {
    return `/creators/${id}/audience`;
  };

  const fetch = (): Promise<Data> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Data, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!id,
  });
  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="">
        {JSON.stringify(data)}
      <div className="grid grid-cols-3 gap-2">
        <AgeSplit />
        <GenderSplit />
        <FollowerCredibilty />
      </div>
    </div>
  );
};

export default AudienceGraph;

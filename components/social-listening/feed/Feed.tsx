import React from "react";
import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import FeedCard from "./FeedCard";

const Feed = ({ id }: { id: string }) => {
  const buildQueryString = (): string => {
    const query = `/brands/${id}/mentions`;
    return query;
  };

  const fetch = (): Promise<Mentions> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Mentions, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!id,
  });

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="col-span-3 flex flex-col gap-2">
        {data &&
          data.mentions &&
          data.mentions.web.map((post) => <FeedCard key={post.id} data={post} />)}

        {/* {data &&
          data.mentions &&
          data.mentions.social.map((post) => <FeedCard data={post} />)} */}
      </div>
    </div>
  );
};

export default Feed;

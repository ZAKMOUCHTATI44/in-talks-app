import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import PostCard from "./PostCard";

const PostMedia = ({ id }: { id: string }) => {
  const buildQueryString = (): string => {
    return `/creators/${id}/posts`;
  };

  const fetch = (): Promise<Post[]> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Post[], Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!id,
  });
  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
    {data && data.length > 0 && (
      <div className="grid grid-cols-4 gap-5">
        {data.map(post => (
            <PostCard post={post} key={post.id} />
        ))}
      </div>
    )}
    </>
  );
};

export default PostMedia;

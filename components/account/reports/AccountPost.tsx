import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import PostCard from "./PostCard";

const AccountPost = ({ id }: { id: string }) => {
  const buildQueryString = (): string => {
    const query = `/accounts/posts/${id}`;
    return query;
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
    <div>
          <div>
            <div>
              <h2 className="my-5 text-xl flex justify-center items-center gap-2">
                Popular Post
              </h2>
              <div className="grid grid-cols-4 gap-5">
                {data && data.map((post) => (
                  <PostCard post={post} key={post.id} />
                ))}
              </div>
            </div>
          </div>
    </div>
  );
};

export default AccountPost;

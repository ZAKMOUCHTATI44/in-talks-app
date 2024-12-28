import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import PostCard from "./PostCard";
import Image from "next/image";

const PostMedia = ({
  id,
  network,
  type,
}: {
  id: string;
  network?: string;
  type?: string;
}) => {
  const buildQueryString = (): string => {
    let query = `/creators/${id}/posts/`;
    if (type === "brands") {
      query = `/brands/${id}/posts/`;
    }

    if (network) query += network;
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
      {data && data.length > 0 && (
        <div>
          <h2 className="my-12 text-xl flex justify-center items-center gap-2">
            {network && (
              <Image
                src={`/social-media/${network}.png`}
                alt=""
                width={25}
                height={25}
              />
            )}
            Popular Post
          </h2>

          <div className="grid grid-cols-3 gap-5">
            {data.slice(0, 8).map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostMedia;

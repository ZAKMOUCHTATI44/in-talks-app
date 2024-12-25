import { BASE_URL } from "@/lib/hepler";
import { formatNumber } from "@/lib/number";
import { Eye, Heart, MessageCircle, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-darkColor py-5 px-2 shadow-md rounded-md flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div
              className="rounded-full h-[45px] w-[45px]"
              style={{
                background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
              }}
            >
              <div
                className="rounded-full mx-auto w-[43px] h-[43px] bg-contain p-0.5"
                style={{
                  backgroundImage: `url(${BASE_URL}/media/account?id=${post.account})`,
                }}
              ></div>
            </div>
            <p className="text-xs">@{post.handle}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={`/social-media/${post.network}.png`}
              alt=""
              width={15}
              height={15}
            />
            <span className="text-xs">{post.network}</span>
            <Link href={post.url} target="_blank">
              <Share fontSize={20} color="#ff56e3" className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div
          className="w-full h-[340px] bg-darkColor bg-cover my-5 rounded-md backdrop-blur-sm"
          style={{
            backgroundImage: `url(${BASE_URL}/media/post?id=${post.id})`,
          }}
        ></div>
      </div>

      <div>
        <p className="text-xs">{post.date}</p>
        <p className="text-sm py-2">
          {post.caption && `${post.caption.substring(0, 100)} ...`}
        </p>
        <div className="flex items-center gap-2">
          {post.views != 0 && (
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-5" />
              <p className="text-xs">{formatNumber(post.views)}</p>
            </div>
          )}
          {post.likes != 0 && (
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-5" />
              <p className="text-xs">{formatNumber(post.likes)}</p>
            </div>
          )}
          {post.comments != 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-5" />
              <p className="text-xs">{formatNumber(post.comments)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

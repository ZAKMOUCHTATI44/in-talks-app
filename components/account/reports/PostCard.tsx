import { formatNumber } from "@/lib/number";
import { Eye, Heart, MessageCircle, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="dark:bg-darkColor  border border-gray-200 dark:border-gray-600 py-5 px-2 shadow-md rounded-md flex flex-col justify-between">
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
                  backgroundImage: `url(${post.pictureUrl})`,
                }}
              ></div>
            </div>
            <p className="text-xs">@{post.username}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={`/social-media/${post.network}.png`}
              alt={post.network}
              width={20}
              height={20}
            />
            <Link href={post.mediaUrl} target="_blank">
              <Share fontSize={20} color="#ff56e3" className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div
          className="w-full h-[280px] bg-darkColor bg-cover my-5 rounded-md backdrop-blur-sm"
          style={{
            backgroundImage: `url(${post.thumbnailUrl})`,
          }}
        ></div>
      </div>

      <div>
        <p className="text-xs">{post.date}</p>
        <p className="text-xs py-2">
          {post.caption && `${post.caption.substring(0, 100)} ...`}
        </p>
        <div className="flex items-center gap-2">
          {post.viewCountRaw != 0 && (
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-5" />
              <p className="text-xs">{formatNumber(Number(post.viewCountRaw))}</p>
            </div>
          )}
          {post.likeCountRaw != 0 && (
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-5" />
              <p className="text-xs">{formatNumber(Number(post.likeCountRaw))}</p>
            </div>
          )}
          {post.commentCountRaw != 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-5" />
              <p className="text-xs">{formatNumber(Number(post.commentCountRaw))}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

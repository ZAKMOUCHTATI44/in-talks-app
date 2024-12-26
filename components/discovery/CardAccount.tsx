import { BASE_URL } from "@/lib/hepler";
import { formatNumber } from "@/lib/number";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { BarChart2, Heart } from "lucide-react";
import ReportAccount from "../account/ReportAccount";

const CardAccount = ({ account }: { account: Account }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="bg-darkColor p px-2 flex flex-col justify-between shadow-md rounded-md border-[0.2px] border-gray-600">
      <div>
        <div className="flex flex-col items-center pt-8 gap-2 relative pb-4">
          <div
            className="rounded-full h-[60px] w-[60px] mx-auto flex justify-start"
            style={{
              background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
            }}
          >
            <div
              className="rounded-full mx-auto w-[58px] h-[58px] bg-contain p-0.5"
              style={{
                backgroundImage: `url(${BASE_URL}/media/account?id=${account.insights.top.id})`,
              }}
            ></div>
          </div>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-sm flex items-center gap-2">
              {account.name}
              {account.verified && (
                <div className="">
                  <Image
                    src={"/social-media/verified.png"}
                    alt="Verifed"
                    width={15}
                    height={15}
                  />
                </div>
              )}
            </h2>
            <p className="text-xs">{account.title}</p>
          </div>
          <div className=" absolute top-2 right-0 flex gap-1">
            <Button
              size={"icon"}
              className="bg-[#F31260] hover:bg-[#F31260] hover:text-whiteColor border border-[#F31260] -600 text-white"
            >
              <Heart />
            </Button>

            <Button
              onClick={() => setOpen(true)}
              size={"icon"}
              className="bg-[#17C964] hover:bg-[#17C964] hover:text-[#17C964] border border-gray-600 text-white"
            >
              <BarChart2 />
            </Button>

            <ReportAccount open={open} setOpen={setOpen} id={account.id} />
          </div>
        </div>
        <div className="py-3 border-t-[0.2px] border-gray-600">
          <p className="text-xs text-justify leading-5">
            {account.description.substring(0, 200)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-5 py-2 items-center">
        <div>
          <div
            key={account.insights.top.id}
            className="flex items-center gap-2 py-2 flex-col"
          >
            <div
              className="h-8 w-8 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${`/social-media/${account.insights.top.network}.png`})`,
              }}
            />
            <p className="text-sm">
              {formatNumber(Number(account.insights.top.subscribers))}
            </p>
            <p className="text-xs bg-[#21BA4526] text-white px-3 py-1 rounded-md">
              {formatNumber(Number(account.insights.top.growth))}
            </p>
          </div>
        </div>
        <div className="col-span-4 gap-2  justify-end flex">
          {account?.posts?.length > 0 &&
            account.posts.map((post) => (
              <div
                key={post.id}
                className="h-[80px] w-[80px] rounded-md bg-cover bg-no-repeat bg-center hover:grayscale"
                style={{
                  backgroundImage: `url(${BASE_URL}/media/post?id=${post.id})`,
                }}
              ></div>
            ))}
        </div>
      </div>
      <div className="flex gap-5 py-2 border-t-[0.1px] border-gray-600">
        {account.accounts.length > 0 &&
          account.accounts.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 py-2">
              <div
                className="h-4 w-4 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${`/social-media/${item.network}.png`})`,
                }}
              />
              {index < 4 && (
                <p className="text-xs">{formatNumber(item.subscribers)}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardAccount;
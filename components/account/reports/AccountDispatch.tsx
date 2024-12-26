import { formatNumber } from "@/lib/number";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";

const AccountDispatch = ({
  accounts,
  name,
}: {
  accounts: SocialAccounts[];
  name: string;
}) => {
  return (
    <div className=" text-whiteColor md mb-5">
      <div className="grid grid-cols-3 gap-2">
        {/* Card for top account */}
        <div className="bg-darkColor py-5 px-5 rounded-md flex flex-col justify-between">
          <div>
            <div className="flex gap-2 items-center">
              <div
                className="h-12 w-12 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${`/social-media/${accounts[0].network}.png`})`,
                }}
              ></div>
              <div>
                <h2 className="text-sm flex gap-1 items-center">
                  {name}
                  {accounts[0].verified && (
                    <div>
                      <Image
                        src={"/social-media/verified.png"}
                        alt="verified"
                        width={15}
                        height={15}
                      />
                    </div>
                  )}
                </h2>
                <p className="text-xs">@{accounts[0].handle}</p>
              </div>
            </div>
            <div className="my-5 border-l-4 border-violet-600 pl-2 flex justify-between">
              <p className="text-xs">{accounts[0].bio}</p>
              <div className="flex flex-col items-center ">
                <p>Subscribers</p>
                <p># {formatNumber(accounts[0].subscribers)}</p>
                <p className="text-xs">{accounts[0].subscribers} </p>
              </div>
            </div>
          </div>
          <div className=" border-t-2 border-gray-600 grid grid-cols-2 justify-center ">
            <div className="p-2 border-r border-gray-600 flex gap-2 items-center">
              <TrendingUp className="bg-bgDarkColor p-2 h-8 w-8 rounded-full" />
              <div>
              <p className="text-xs mb-2">Engagement</p>
                <p className="bg-[#21BA4526] text-white text-sm px-5 py-1 rounded-md">
                  {(accounts[0].engagement_rate * 100).toFixed(2)} %
                </p>
              </div>
            </div>
            <div className="p-2 flex gap-2 items-center">
              <TrendingUp className="bg-bgDarkColor p-2 h-8 w-8 rounded-full" />
              <div>
              <p className="text-xs">Growth rate</p>
                <p className="bg-[#21BA4526] text-white text-sm px-5 py-1 rounded-md mt-2">
                  {accounts[0].score}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-2 grid grid-cols-2 gap-5">
          {accounts.slice(1, accounts.length).map((item) => (
            <div className="bg-darkColor flex flex-col justify-between rounded-md py-5 px-2" key={item.id}>
              <div className="flex justify-between">
                <div>
                <div className="flex gap-2 items-center">
                  <div
                    className="h-8 w-8 bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${`/social-media/${item.network}.png`})`,
                    }}
                  ></div>
                  <div>
                    <h2 className="text-sm flex gap-1 items-center">
                      {name}
                      {accounts[0].verified && (
                        <div>
                          <Image
                            src={"/social-media/verified.png"}
                            alt="verified"
                            width={15}
                            height={15}
                          />
                        </div>
                      )}
                    </h2>
                    <p className="text-xs">@{accounts[0].handle}</p>
                  </div>

                </div>

              </div>
                <div className="flex flex-col items-center ">
                  <p>Subscribers</p>
                  <p># {formatNumber(accounts[0].subscribers)}</p>
                </div>
              </div>
              <div className=" border-t-2 border-gray-600 grid grid-cols-2 justify-center ">
            <div className="p-2 border-r border-gray-600 flex gap-2 items-center">
              <TrendingUp className="bg-bgDarkColor p-2 h-8 w-8 rounded-full" />
              <div>
                <p className="text-xs mb-2">Engagement</p>
                <p className="bg-[#21BA4526] text-white text-sm px-5 py-1 rounded-md">
                {(accounts[0].engagement_rate * 100).toFixed(2)} %
                </p>
              </div>
            </div>
            <div className="p-2 flex gap-2 items-center">
              <TrendingUp className="bg-bgDarkColor p-2 h-8 w-8 rounded-full" />
              <div>
                <p className="text-xs">Growth rate</p>
                <p className="bg-[#21BA4526] text-white text-sm px-5 py-1 mt-2 rounded-md">
                  {item.growth_rate}
                </p>
              </div>
            </div>
          </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountDispatch;

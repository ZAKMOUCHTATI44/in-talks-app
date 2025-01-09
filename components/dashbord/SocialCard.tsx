import { BASE_URL } from "@/lib/hepler";
import Image from "next/image";
import React from "react";

const SocialCard = ({ account }: { account: Account }) => {
  return (
    <div className="w-[400px] relative p-[0.8px] bg-[linear-gradient(45deg,#4ec6fb,#ff56e3)] rounded-lg shadow-md">
      <div className="bg-gray-800 text-white rounded-lg pt-6 px-3 h-full flex flex-col items-stretch gap-4">
        <div className="flex items-center gap-2">
            <div
            className="rounded-full h-[70px] w-[70px] flex justify-center items-center"
            style={{
                background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
            }}
            >
            <div
                className="rounded-full mx-auto w-[66px] h-[66px] bg-contain p-0.5"
                style={{
                backgroundImage: `url(${BASE_URL}/media/account?id=${account.pictureUrl})`,
                }}
            ></div>
            </div>
            <div className="flex flex-col gap-2">
            <h2 className="text-sm flex items-center gap-2">
                {account.name}
                {/* {account && (
                <div className="">
                    <Image
                    src={"/social-media/verified.png"}
                    alt="Verifed"
                    width={15}
                    height={15}
                    />
                </div>
                )} */}
            </h2>
            <div className="bg-[linear-gradient(45deg,#4ec6fb,#ff56e3)] h-[0.5px] w-full"></div>
            <div className="flex gap-2 items-center">
                <Image src={"/icons/504.png"} width={25} height={25}  alt="Morocco" />
                <p className=" text-xs">
                Maroc
                </p>
            </div>
            <div className="bg-[linear-gradient(45deg,#4ec6fb,#ff56e3)] h-[0.5px] w-full"></div>

            </div>
        </div>
        <div className="flex gap-2">
        {/* Card Footer */}
        {/* {account.accounts.length > 0 &&
          account.accounts
            .slice(0, account.accounts.length)
            .map((item, index) => (
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
            ))} */}

        </div>
      </div>
    </div>
  );
};

export default SocialCard;

import { formatNumber } from "@/lib/number";
import React from "react";

const AccountDispatch = ({ accounts }: { accounts: SocialAccounts[] }) => {
  return (
    <div className="bg-darkColor text-whiteColor py-5 px-5 shadow-md rounded-md">
      <div className="grid grid-cols-3">
        {/* Card for top account */}
        <div className="px-3">
          <div className="flex gap-5">
            <div
              className="h-12 w-12 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${`/social-media/${accounts[0].network}.png`})`,
              }}
            ></div>
            <div className="flex flex-col gap-2 items-center">
              <p>Posts</p>
              <p>0</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p>subscribers</p>
              <p>{formatNumber(accounts[0].subscribers)}</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p>Following</p>
              <p> 0 </p>
            </div>
          </div>
        </div>
        <div className=" col-span-2 grid grid-cols-2">
          <div className=" block h-[100%] bg-green-600"></div>
          <div className=" block h-[100%] bg-black -600"></div>
          <div className=" block h-[100%] bg-black -600"></div>
          <div className=" block h-[100%] bg-green-600"></div>
        </div>
      </div>
    </div>
  );
};

export default AccountDispatch;

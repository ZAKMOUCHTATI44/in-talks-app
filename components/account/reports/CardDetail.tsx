import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/lib/hepler";
import { formatNumber } from "@/lib/number";
import React from "react";

const CardDetail = ({ account }: { account: Account }) => {
  return (
    <div className="bg-darkColor text-whiteColor shadow-md py-5 px-2 rounded-md">
      <div className="flex flex-col gap-5 items-start">
        <div
          className="rounded-full h-[75px] w-[75px] mx-auto flex justify-start"
          style={{
            background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
          }}
        >
          <div
            className="rounded-full mx-auto w-[72px] h-[72px] bg-contain p-0.5"
            style={{
              backgroundImage: `url(${BASE_URL}/media/account?id=${account.accounts[0].id})`,
            }}
          ></div>
        </div>
        <div className="text-center w-full">
          <h2 className="font-semibold text-xl">{account.name}</h2>
          <p className="text-xs font-medium">{account.title}</p>
        </div>
        <div className="w-full justify-center flex gap-5 py-2 border-t-[0.1px] border-gray-600">
          {account.accounts.length > 0 &&
            account.accounts.map((item) => (
              <div key={item.id} className="flex items-center gap-2 py-2">
                <div
                  className="h-4 w-4 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${`/social-media/${item.network}.png`})`,
                  }}
                />
                <p className="text-xs">{formatNumber(item.subscribers)}</p>
              </div>
            ))}
        </div>
        <p className="text-sm">{account.description}</p>
        <div className="flex justify-start gap-2">
          {account.categories.map((category) => (
            <Badge key={category.name} variant={"outline"} className="bg-mainColor">{category.name}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;

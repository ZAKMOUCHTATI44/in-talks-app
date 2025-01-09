import { formatNumber } from "@/lib/number";
import React from "react";
import { Button } from "../ui/button";
import { BarChart2, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CardAccount = ({
  account,
  selected,
  setSelectAccount,
}: {
  account: Account;
  selected: boolean;
  setSelectAccount: (e: Account) => void;
}) => {
  const router = useRouter();

  return (
    <div
      className={`dark:bg-darkColor bg-white p px-2 flex flex-col justify-between shadow-md rounded-md border-[0.2px]${
        selected
          ? " border-mainColor "
          : " dark:border-gray-600 border-gray-300 "
      }`}
    >
      <div>
        <div className="flex flex-col items-center pt-8 gap-2 relative pb-4">
          <div
            className="rounded-full h-[60px] w-[60px] mx-auto flex justify-start"
            style={{
              background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
            }}
          >
            <img
              src={account.pictureUrl}
              alt={account.name}
              loading="lazy"
              className="rounded-full mx-auto w-[58px] h-[58px] bg-contain p-0.5"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-sm flex items-center gap-2">
              {account.name}
              {account.networks[0] && (
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
            <p className="text-xs capitalize">{account.title}</p>
          </div>
          <div className=" absolute top-2 right-0 flex gap-1">
            <Button
              size={"icon"}
              onClick={() => {
                setSelectAccount(account);
              }}
              className={`border border-gray-600 text-gray-500 ${
                selected
                  ? " bg-[#eb4254] text-white"
                  : "bg-transparent hover:bg-transparent "
              }`}
            >
              <Heart />
            </Button>

            <Button
              asChild
              size={"icon"}
              className="bg-transparent hover:bg-transparent border border-gray-600 text-gray-500"
            >
              <Link href={`/report/${account.id}`}>
                <BarChart2 className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div
          onClick={() => {
            router.push(`/report/${account.id}`);
          }}
          className="py-3 border-t-[0.2px] border-gray-600"
        >
          <p className="text-xs text-justify leading-5">
            {account.description.substring(0, 250)}
          </p>
        </div>
      </div>
      <div
        onClick={() => {
          router.push(`/report/${account.id}`);
        }}
        className="grid grid-cols-5 py-2 items-center"
      >
        <div className="flex flex-col gap-0">
          <div
            className="flex items-center gap-0 py-2 flex-col"
          >
            {account && account.networks.length > 0 && (
              <>
                <div
                  className="h-8 w-8 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${`/social-media/${account.networks[0].network}.png`})`,
                  }}
                />

                <p className="text-sm">
                  {formatNumber(Number(account.networks[0].followers))}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="col-span-4 gap-2  justify-end flex">
          {account?.topPost?.length > 0 &&
            account.topPost.map((post) => (
              <div
                key={post}
                className="h-[75px] w-[75px] rounded-md bg-cover bg-no-repeat bg-center hover:grayscale"
                style={{
                  backgroundImage: `url(${post})`,
                }}
              ></div>
            ))}
        </div>
      </div>
      <div
        onClick={() => {
          router.push(`/report/${account.id}`);
        }}
        className="flex gap-5 py-2 border-t-[0.1px] border-gray-600"
      >
        {account.networks.length > 0 &&
          account.networks.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 py-2">
              <div
                className="h-4 w-4 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${`/social-media/${item.network}.png`})`,
                }}
              />
              {index < 3 && (
                <p className="text-xs">{formatNumber(item.followers)}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardAccount;

import { BASE_URL } from "@/lib/hepler";
import { Users } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const FavListCard = ({ fav }: { fav: FavList }) => {

  return (
    <div
      className="bg-darkColor w-full rounded-md py-2 text-whiteColor flex flex-col justify-between"
    >
      <h2 className="capitalize border-b border-gray-600 px-3 py-2">
        {fav.label}
      </h2>
      <div className="px-3 pt-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <p>{fav.creators_count}</p>
          </div>
          <div className="flex">
            {fav.creators.length > 0 &&
              fav.creators.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className={`rounded-full h-[50px] w-[50px] mx-auto flex justify-start ml-[-20px]`}
                  style={{
                    background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                  }}
                >
                  <div
                    className="rounded-full mx-auto w-[48px] h-[48px] bg-contain p-0.5"
                    style={{
                      backgroundImage: `url(${BASE_URL}/media/account?id=${item.picture})`,
                    }}
                  ></div>
                </div>
              ))}
          </div>
        </div>
        <p className="pt-5 text-sm">{fav.description}</p>
        <Button asChild className="mt-3 bg-darkColor text-whiteColor border border-gray-600 w-full hover:bg-mainColor hover:text-white" >
          <Link href={`/favoris/${fav.id}`}>
          <Users />
          Voir les creators
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FavListCard;

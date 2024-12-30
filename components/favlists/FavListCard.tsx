import { BASE_URL } from "@/lib/hepler";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const FavListCard = ({ fav }: { fav: FavList }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/favoris/${fav.id}`);
      }}
      className="bg-darkColor w-full rounded-md py-2 text-whiteColor"
    >
      <h2 className="capitalize border-b border-gray-600 pb-3 px-3">
        {fav.label}
      </h2>
      <div className="px-3 py-5">
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
      </div>
    </div>
  );
};

export default FavListCard;

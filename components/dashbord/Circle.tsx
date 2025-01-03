"use client";
import React from "react";
import Error from "@/components/utils/Error";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import "@/app/css/creator-netwrok.css";
import Loading from "@/components/utils/Loading";
import { BASE_URL } from "@/lib/hepler";
import AutoCompleteFilter from "@/components/account/AutoCompleteFilter";
import { useRouter } from "next/navigation";

interface Data {
  id: string;
  picture: string;
  name: string;
}

const Circle = () => {
  const queryBuilder = () => {
    const query = "creators/list";

    return query;
  };

  const fetch = (): Promise<Data[]> =>
    api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Data[], Error>({
    queryKey: ["creators/list", queryBuilder()],
    queryFn: fetch,
  });

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="relative mt-[360px]">
        {data && (
          <>
            <BoxCreators
              className="transform rotate-[25deg]"
              size={440}
              duration={30}
              data={data.slice(0, 6)}
            />
            <BoxCreators
              className=""
              size={560}
              duration={30}
              data={data.slice(6, 12)}
            />
            <BoxCreators
              className="transform rotate-[75deg]"
              size={660}
              duration={30}
              data={data.slice(12, 18)}
            />
            {/* */}
            {/*
             */}
          </>
          // <div>
          //     {JSON.stringify(data.slice(0.3))}
          // </div>
        )}
        {/* <BoxCreators
          size={330}
          duration={40}
          data={data.mentions.in.slice(4, 8)}
        />
        <BoxCreators
          size={430}
          duration={55}
          data={data.mentions.in.slice(8, 12)}
        /> */}
        <MiddleElement />

        {/* <FilterBrand /> */}
      </div>
    </div>
  );
};

const BoxCreators = ({
  size,
  duration,
  data,
  className,
}: {
  size: number;
  duration: number;
  data: Data[];
  className: string;
}) => {
  return (
    <div
      className={`box-network px-12 ${className}`}
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          height: `${size}px`,
          width: `${size}px`,
          border: "0.3px solid #EFEFEF",
        } as React.CSSProperties
      }
    >
      {data.map((item, index) => (
        <div className={`group-icon `} key={item.id} style={{ zIndex: "99px" }}>
          <div className={`box-${index} children-container `}>
            <img
              src={`${BASE_URL}/media/account?id=${item.picture}`}
              width={74}
              height={74}
              className="rounded-full mx-auto w-[74px] h-[74px] bg-contain p-0.5"
              alt=""
            />

            {/* 
            <img
              src={item.picture}
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
              }}
              alt=""
            /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

const MiddleElement = () => {
  const router = useRouter();
  return (
    <div className="inset-1/2 z-50 -translate-x-1/2 -top-[40px] -translate-y-1/2 absolute w-[340px] text-center flex flex-col gap-2">
      <h2 className="text-white text-xl font-semibold">Network Watch</h2>
      <p className="text-whiteColor">Explore Creator Partnerships & Networks</p>
      <AutoCompleteFilter
        type="Brand"
        onValueChange={(account) => {
          router.push(`/social-listening/${account.id}`);
        }}
      />
    </div>
  );
};

export default Circle;

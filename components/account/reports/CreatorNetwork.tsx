import React from "react";
import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import "@/app/css/creator-netwrok.css";
import ListAffichage from "./ListAffichage";


interface Mention {
  id: string;
  name: string;
  picture: string;
  count: string;
  type: string;
}

interface Data {
  mentions: {
    in: Mention[];
    out: Mention[];
  };
  hashtags: {
    IG: string[];
    TW: string[] | null;
  };
}

const CreatorNetwork = ({ id, type }: { id: string; type?: string }) => {
  const buildQueryString = (): string => {
    if(type) console.log("appp")
    const query = `/creators/${id}/network`;
    return query;
  };

  const fetch = (): Promise<Data> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Data, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!id,
  });
  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div>
      {data && (
        <div className="grid grid-cols-3 ">
          <div className="col-span-2 mt-[350px] relative mx-auto">
            <BoxCreators
              size={220}
              duration={30}
              data={data.mentions.in.slice(0, 4)}
            />
            <BoxCreators
              size={330}
              duration={40}
              data={data.mentions.in.slice(4, 8)}
            />
            <BoxCreators
              size={430}
              duration={55}
              data={data.mentions.in.slice(8, 12)}
            />
            {/* 
          
          <BoxCreators
            size={540}
            duration={30}
            data={data.mentions.in.slice(0, 5)}
          /> */}
            {/* <BoxCreators size={440} duration={30} data={data.slice(8, 12)} /> */}
            <MiddleElement />
          </div>
          <div className="mt-12">
            <ListAffichage props={{
                title :"Most Hashtags",
                data : data.hashtags.IG.map(item => ({
                    key : item.toString(),
                  
                }))
            }} />

          </div>
        </div>
      )}
    </div>
  );
};

const BoxCreators = ({
  size,
  duration,
  data,
}: {
  size: number;
  duration: number;
  data: Mention[];
}) => {
  return (
    <div
      className="box-network"
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
              src={item.picture}
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
              }}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const MiddleElement = () => {
  return (
    <div
      style={{
        inset: "50%",
        width: "75px",
        height: "75px",
        zIndex: 199,
        translate: " -50% -50%",
        position: "absolute",
      }}
    >
      <img
        src="https://api.inflauditor.ma/media/account?id=StVDrkoqyoxN2yb1TyyTno"
        width={75}
        height={75}
        style={{
          borderRadius: "50%",
        }}
        alt=""
      />
    </div>
  );
};

export default CreatorNetwork;

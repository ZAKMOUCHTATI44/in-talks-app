import React from "react";
import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import "@/app/css/creator-netwrok.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BASE_URL } from "@/lib/hepler";

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
  id: string;
  picture: string;
  hashtags: {
    IG: string[];
    TW: string[] | null;
  };
}

const CreatorNetwork = ({ id, type }: { id: string; type?: string }) => {
  const buildQueryString = (): string => {
    if (type) console.log("appp");
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
        <div className="grid grid-cols-3 items-start pb-32">
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
            <MiddleElement picture={data.picture} />

            {/* 
          
          <BoxCreators
            size={540}
            duration={30}
            data={data.mentions.in.slice(0, 5)}
          /> */}
            {/* <BoxCreators size={440} duration={30} data={data.slice(8, 12)} /> */}
          </div>
          <div className="mt-12">
            <Tabs defaultValue="hasTagged" className="">
              <TabsList className="grid w-full grid-cols-2 bg-darkColor">
                <TabsTrigger value="hasTagged">Has Tagged</TabsTrigger>
                <TabsTrigger value="wasTagged">Has Tagged</TabsTrigger>
              </TabsList>
              <TabsContent value="hasTagged">
                <div className="h-[500px] overflow-scroll flex flex-col gap-2">
                  {data.mentions.in.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 px-3 rounded-lg relative bg-darkColor"
                    >
                      <div className="flex items-center gap-2 ">
                        <div
                          className="rounded-full h-[60px] w-[60px] flex justify-start"
                          style={{
                            background:
                              "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                          }}
                        >
                          <img
                            src={item.picture}
                            alt={item.name}
                            className="rounded-full mx-auto w-[58px] h-[58px] bg-contain p-0.5"
                          />
                        </div>
                        <h2 className="text-sm">{item.name}</h2>
                      </div>

                      <p className="bg-bgDarkColor h-8 w-8 flex justify-center items-center rounded-full">
                        {item.count}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="wasTagged">
                <div className="h-[500px] overflow-scroll flex flex-col gap-2">
                  {data.mentions.out.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 px-3 rounded-lg relative bg-darkColor"
                    >
                      <div className="flex items-center gap-2 ">
                        <div
                          className="rounded-full h-[60px] w-[60px] flex justify-start"
                          style={{
                            background:
                              "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                          }}
                        >
                          <img
                            src={item.picture}
                            alt={item.name}
                            className="rounded-full mx-auto w-[58px] h-[58px] bg-contain p-0.5"
                          />
                        </div>
                        <h2 className="text-sm">{item.name}</h2>
                      </div>

                      <p className="bg-bgDarkColor h-8 w-8 flex justify-center items-center rounded-full">
                        {item.count}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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

const MiddleElement = ({ picture }: { picture: string }) => {
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
        src={`${BASE_URL}/media/account?id=${picture}`}
        width={75}
        height={75}
        style={{
          borderRadius: "50%",
        }}
        alt="KHdkabd"
      />
    </div>
  );
};

export default CreatorNetwork;

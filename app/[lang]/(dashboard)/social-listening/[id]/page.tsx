"use client";
import React from "react";
import CardDetail from "@/components/account/reports/CardDetail";
import NicheAccount from "@/components/account/reports/NicheAccount";
import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadAsPdf from "@/components/account/DownloadAsPdf";
import Feed from "@/components/social-listening/feed/Feed";

const Page = ({ params }: { params: { id: string } }) => {
  const buildQueryString = (): string => {
    const query = `/brands/${params.id}`;
    return query;
  };

  const fetch = (): Promise<Account> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Account, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!params.id,
  });

  if (error) return <Error />;

  return (
    <div className="px-5">
      {isLoading && <Loading />}
      {data && (
        <>
          <div className="grid grid-cols-12 gap-2 items-stretch">
            <div className="col-span-6">
              <CardDetail account={data} />
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              <NicheAccount data={data} />
              <DownloadAsPdf />
            </div>

            <Tabs defaultValue="feed" className="col-span-12 mt-5">
              <TabsList className="grid w-full grid-cols-5 dark:bg-darkColor">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="network-watch">Network Watch</TabsTrigger>
                <TabsTrigger value="creator-network">
                Creator Network
                </TabsTrigger>
                <TabsTrigger value="veille-concurrentielle">Veille concurrentielle</TabsTrigger>
                <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              </TabsList>
              <TabsContent value="feed" className="mt-5">
                <Feed id={params.id} /> 
              </TabsContent>
             
            </Tabs>

            {/* <div className="col-span-12">
              <AccountDispatch accounts={data.accounts} name={data.name} />
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

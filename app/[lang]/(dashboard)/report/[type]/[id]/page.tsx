"use client";
import React from "react";
import AudienceGraph from "@/components/account/reports/AudienceGraph";
import CardDetail from "@/components/account/reports/CardDetail";
import NicheAccount from "@/components/account/reports/NicheAccount";
import PostMedia from "@/components/account/reports/PostMedia";
import SocialCoverage from "@/components/account/reports/SocialCoverage";
import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatorNetwork from "@/components/account/reports/CreatorNetwork";
import DownloadAsPdf from "@/components/account/DownloadAsPdf";

const Page = ({ params }: { params: { id: string; type: string } }) => {
  const buildQueryString = (): string => {
    let query = `/creators/${params.id}`;

    if (params.type === "brands") {
      query = `/brands/${params.id}`;
    }
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

            <Tabs defaultValue="posts" className="col-span-12 mt-5">
              <TabsList className="grid w-full grid-cols-4 dark:bg-darkColor">
                <TabsTrigger value="posts">Post</TabsTrigger>
                <TabsTrigger value="socialCoverage">
                  Social Coverage
                </TabsTrigger>
                <TabsTrigger value="creatorNetwrok">
                  Creator Network
                </TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                {data.accounts.map((netwrok) => (
                  <PostMedia
                    type={params.type}
                    key={netwrok.id}
                    id={params.id}
                    network={netwrok.network}
                  />
                ))}
              </TabsContent>
              <TabsContent value="socialCoverage">
                <SocialCoverage type={params.type} id={params.id} />
              </TabsContent>
              <TabsContent value="creatorNetwrok">
                <CreatorNetwork type={params.type} id={params.id} />
              </TabsContent>
              <TabsContent value="audience">
                <AudienceGraph type={params.type} id={params.id} />
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

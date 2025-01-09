"use client";
import React from "react";
import AudienceGraph from "@/components/account/reports/AudienceGraph";
import CardDetail from "@/components/account/reports/CardDetail";
import NicheAccount from "@/components/account/reports/NicheAccount";
import SocialCoverage from "@/components/account/reports/SocialCoverage";
import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadAsPdf from "@/components/account/DownloadAsPdf";
import { useSession } from "next-auth/react";
import AccountPost from "@/components/account/reports/AccountPost";

const Page = ({ params }: { params: { id: string; type: string } }) => {
  const { data: session } = useSession();


  const buildQueryString = (): string => {
    const query = `/accounts/show/${params.id}`;
    return query;
  };

  const fetch = (): Promise<Account> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Account, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!params.id && !!session?.user.accessToken,
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
              <TabsList className="grid w-full grid-cols-3 dark:bg-darkColor">
                <TabsTrigger value="posts">Post</TabsTrigger>
                <TabsTrigger value="socialCoverage">
                  Social Coverage
                </TabsTrigger>
                {/* <TabsTrigger value="creatorNetwrok">
                  Creator Network
                </TabsTrigger> */}
                <TabsTrigger value="audience">Audience</TabsTrigger>
                {/* <TabsTrigger value="scoring">Scoring</TabsTrigger> */}
              </TabsList>
              <TabsContent value="posts">
                <AccountPost id={data.id} />
              </TabsContent>
              <TabsContent value="socialCoverage">
                <SocialCoverage  id={data.id} />
              </TabsContent>
              <TabsContent value="audience">
                <AudienceGraph />
              </TabsContent>
              {/* 
             
              <TabsContent value="creatorNetwrok">
                <CreatorNetwork type={params.type} id={params.id} />
              </TabsContent>
               */}
            </Tabs>
            {/*
             */}

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

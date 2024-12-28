"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import CardDetail from "./reports/CardDetail";
import NicheAccount from "./reports/NicheAccount";
import SocialCoverage from "./reports/SocialCoverage";
import PostMedia from "./reports/PostMedia";
import AudienceGraph from "./reports/AudienceGraph";
import AccountDispatch from "./reports/AccountDispatch";

function ReportAccount({
  id,
  type,
  open,
  setOpen,
  children,
}: {
  id: string;
  open: boolean;
  setOpen: (e: boolean) => void;
  children: React.ReactNode;
  type?:string
}) {
  const buildQueryString = (): string => {
    let query = `/creators/${id}`;
    if(type === "brands") {

      query = `/brands/${id}`;
    }
    return query;
  };

  const fetch = (): Promise<Account> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Account, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: open,
  });

  if (error) return <Error />;

  return (
    <div>
      {children}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="dark:bg-bgDarkColor">
          <div className="mx-auto w-full h-[90vh] overflow-y-scroll  gap-3 px-5" id="pdf-content">
            <DrawerHeader>
              <DrawerTitle className="hidden">ddad</DrawerTitle>
              {isLoading && <Loading />}
              {data && (
                <>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3 sticky top-0 h-screen" style={{}}>
                      <CardDetail account={data} />
                    </div>
                    <div className="col-span-9">
                      <AccountDispatch accounts={data.accounts} name={data.name} />
                      <NicheAccount data={data} />
                      <SocialCoverage type={type} id={id} />
                      <AudienceGraph type={type} id={id} />
                      {data.accounts.map((netwrok) => (
                        <PostMedia type={type} key={netwrok.id} id={id} network={netwrok.network} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </DrawerHeader>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default ReportAccount;

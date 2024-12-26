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

function ReportAccount({
  id,
  open,
  setOpen,
}: {
  id: string;
  open: boolean;
  setOpen: (e: boolean) => void;
}) {
  const buildQueryString = (): string => {
    return `/creators/${id}`;
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="bg-bgDarkColor">
        <div className="mx-auto w-full h-[90vh] overflow-y-scroll  gap-3 px-5">
          <DrawerHeader>
            <DrawerTitle className="hidden">ddad</DrawerTitle>
            {isLoading && <Loading />}
            {data && (
              <>
              <div className="grid grid-cols-7 gap-2">
                <div className="col-span-2">
                  <CardDetail account={data} />
                </div>
                <div className="col-span-5">
                  {/* <AccountDispatch accounts={data.accounts} /> */}
                  <NicheAccount data={data} />
                  <AudienceGraph id={id} />
                </div>
              </div>
              <SocialCoverage id={id} />
              <PostMedia id={id} />
              </>
            )}
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ReportAccount;

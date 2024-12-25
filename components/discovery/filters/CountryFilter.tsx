"use client";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useQueryHelper } from "@/components/utils/queryHelpers";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "@/components/utils/Error";

interface Response {
  value: string;
  label: string;
}
const CountryFilter = () => {
  const { createQueryString } = useQueryHelper();
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetch = (): Promise<Response[]> =>
    api.get("/country").then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Response[], Error>({
    queryKey: ["/country"],
    queryFn: fetch,
  });

  if (error) return <Error />;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Country</Label>
      <Select
        value={searchParams.get("country") || undefined}
        onValueChange={(e) => {
          router.push(`?${createQueryString("country", e)}`);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Country</SelectLabel>
            {!isLoading &&
              data &&
              data.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="py-2"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      alt={item.label}
                      src={`/icons/${item.value}.png`}
                      width={25}
                      height={25}
                    />

                    <div className="flex items-center gap-2 capitalize">
                      {item.label}
                    </div>
                  </div>
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountryFilter;

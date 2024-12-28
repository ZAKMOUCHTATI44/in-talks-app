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
import { useQueryHelper } from "@/components/utils/queryHelpers";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "@/components/utils/Error";

interface Response {
  id: string;
  name: string;
  image: string;
  sub: {
    id: string;
    name: string;
    image: string;
  }[];
}
const NicheFilter = () => {
  const { createQueryString } = useQueryHelper();
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const fetchGategories = (): Promise<Response[]> =>
    api.get(`/categories/test2/${category}`).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Response[], Error>({
    queryKey: [`/categories/test2/${category}`],
    queryFn: fetchGategories,
    enabled : !!category
  });

  if (error) return <Error />;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Niches </Label>
      <Select
        onValueChange={(e) => {
          router.push(`?${createQueryString("niche", e)}`);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Niches" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              Niches
            </SelectLabel>
            {!isLoading &&
              data &&
              data.map((item) => (
                <div key={item.id}>
                  <SelectItem key={item.id} value={item.id} className="py-2">
                    <div className="flex items-center gap-2 capitalize">
                      {item.name}
                    </div>
                  </SelectItem>
                </div>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};


export default NicheFilter
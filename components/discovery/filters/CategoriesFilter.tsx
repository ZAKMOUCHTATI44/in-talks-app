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
import { useRouter } from "next/navigation";
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
const CategoriesFilter = () => {
  const { createQueryString } = useQueryHelper();
  const router = useRouter();

  const fetchGategories = (): Promise<Response[]> =>
    api.get("/categories").then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Response[], Error>({
    queryKey: ["/categories", "categories"],
    queryFn: fetchGategories,
  });

  if (error) return <Error />;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Category </Label>
      <Select
        onValueChange={(e) => {
          router.push(`?${createQueryString("category", e)}`);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
            Category
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

export default CategoriesFilter;

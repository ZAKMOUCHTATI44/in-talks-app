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
      <Label>Category & niches </Label>
      <Select
        onValueChange={(e) => {
          router.push(`?${createQueryString("category", e)}`);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category & niches" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {!isLoading &&
              data &&
              data.map((item) => (
                <div key={item.id}>
                  <SelectLabel className=" uppercase text-mainColor">{item.name}</SelectLabel>
                  {item.sub.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id} className="py-2">
                      <div className="flex items-center gap-2 capitalize">
                        {sub.name}
                      </div>
                    </SelectItem>
                  ))}
                </div>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoriesFilter;

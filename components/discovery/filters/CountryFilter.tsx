"use client";
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

const CountryFilter = () => {
  const { createQueryString } = useQueryHelper();
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = [
    {
      value :"Morocco",
      label:"Morocco",
      img:"/icons/504.png"
    },
    {
      value :"Egypte",
      label:"Egypte",
      img:"/icons/818.png"
    },
    {
      value :"Qatar",
      label:"Qatar",
      img:"/icons/634.png"
    }
  ]
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
            {data.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="py-2"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      alt={item.label}
                      src={item.img}
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

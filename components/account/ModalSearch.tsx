"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import Error from "../utils/Error";
import { useQuery } from "@tanstack/react-query";
import CardModal from "./reports/CardModal";

interface Pagination {
  data: Account[];
  total: string;
}
export function ModalSearch() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const buildQueryString = (): string => {
    let queryString = "/search";
    const name = value;

    if (name != null) {
      queryString += `?q=${name}`;
    }
    return queryString;
  };

  const fetch = (): Promise<Pagination> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: [buildQueryString(), value],
    queryFn: fetch,
    enabled: value !== "",
  });

  if (error) return <Error />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[330px] justify-between text-[#2F2B3DAD] dark:text-whiteColor dark:bg-darkColor border dark:border-gray-600 border-gray-300"
        >
          Search for your influencer
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[330px] p-0 dark:bg-darkColor bg-white">
        <Command className="dark:bg-darkColor">
          <CommandInput
            placeholder="Search for your influencer"
            className="h-9"
            value={value}
            onValueChange={(e) => setValue(e)}
          />
          <CommandList>
            {data && data.data.length === 0 && (
              <CommandEmpty>Not found .</CommandEmpty>
            )}

            <CommandGroup>
              {!isLoading &&
                data?.data.map((item) => (
                  <CommandItem
                    className="hover:bg-mainColor flex data-[selected=true]:bg-mainColor hover:!text-white"
                    key={item.name}
                    value={item.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <CardModal account={item} />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ModalSearch;

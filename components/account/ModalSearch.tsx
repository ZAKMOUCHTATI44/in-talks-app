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
import { BASE_URL } from "@/lib/hepler";

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
          className="w-[330px] justify-between bg-darkColor border border-gray-600"
        >
          Search for your influencer
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[330px] p-0 bg-darkColor">
        <Command className="bg-darkColor">
          <CommandInput
            placeholder="Search for your influencer"
            className="h-9"
            value={value}
            onValueChange={(e) => setValue(e)}
          />
          <CommandList>
            <CommandEmpty>Not found .</CommandEmpty>
            <CommandGroup>
              {!isLoading &&
                data?.data.map((item) => (
                  <CommandItem
                    className="hover:bg-mainColor flex data-[selected=true]:bg-mainColor"
                    key={item.name}
                    value={item.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <div
                      className="rounded-full h-11 w-11 flex justify-start"
                      style={{
                        background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                      }}
                    >
                      <div
                        className="rounded-full mx-auto w-10 h-10 bg-contain p-0.5"
                        style={{
                          backgroundImage: `url(${BASE_URL}/media/account?id=${item.picture})`,
                        }}
                      ></div>
                    </div>

                    <p className="text-sm">{item.name}</p>
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

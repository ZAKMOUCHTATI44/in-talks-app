"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { AxiosResponse } from "axios";
// import api from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../utils/Loading";
// import { BASE_URL } from "@/lib/hepler";
// import Error from "../utils/Error";

// interface Pagination {
//   data: Account[];
//   total: string;
// }

function ModalSearch() {
  // const [open, setOpen] = React.useState(false);
  // const [keyword, setKeyword] = React.useState<string>("");

  // const buildQueryString = (): string => {
  //   let queryString = "/search";
  //   const name = keyword;

  //   if (name != null) {
  //     queryString += `?q=${name}`;
  //   }
  //   return queryString;
  // };

  // const fetch = (): Promise<Pagination> =>
  //   api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  // const { isLoading, error, data } = useQuery<Pagination, Error>({
  //   queryKey: [buildQueryString(), keyword],
  //   queryFn: fetch,
  //   enabled: keyword !== "",
  // });

  // const handleSetValue = (val: string) => {
  //   console.log(val);
  // };

  // if (error) return  <Error />;

  return (
        <Button
          variant="outline"
          role="combobox"
          className="w-[330px] justify-between bg-darkColor border border-gray-600"
        >
          <div className="flex gap-2 justify-start">
            Search for your influencer
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
    // <Popover open={open} onOpenChange={setOpen}>
    //   {/* <PopoverTrigger asChild>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-[330px] p-0 bg-darkColor">
    //       <CommandInput
    //         placeholder="Search for your influencer..."
    //         value={keyword}
    //         onValueChange={(e) => {
    //           setKeyword(e);
    //         }}
    //       />
    //     <Command>
    //       {isLoading && <Loading />}
    //       <CommandGroup>
    //         <CommandList>

    //           {data?.data && data.data.length> 0 ? (
    //             <>
    //                {data.data.map((content) => (
    //               <CommandItem
    //                 key={content.id}
    //                 value={content.id}
    //                 className="hover:bg-mainColor flex data-[selected=true]:bg-mainColor"
    //                 onSelect={() => {
    //                   handleSetValue(content.id);
    //                 }}
    //               >
    //                 <div
    //                   className="rounded-full h-11 w-11 flex justify-start"
    //                   style={{
    //                     background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
    //                   }}
    //                 >
    //                   <div
    //                     className="rounded-full mx-auto w-10 h-10 bg-contain p-0.5"
    //                     style={{
    //                       backgroundImage: `url(${BASE_URL}/media/account?id=${content.picture})`,
    //                     }}
    //                   ></div>
    //                 </div>

    //                 {content.name}
    //               </CommandItem>
    //             ))}
    //             </>
    //           ) : ( 
    //             <CommandEmpty>No influencer found.</CommandEmpty>
    //           )}
    //         </CommandList>
    //       </CommandGroup>
    //     </Command>
    //   </PopoverContent> */}
    // </Popover>
  );
}

export default ModalSearch;

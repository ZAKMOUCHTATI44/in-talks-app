"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useQueryHelper } from "@/components/utils/queryHelpers";
import { useRouter } from "next/navigation";

const data = [
  {
    label: "Twitter",
    value: "TT",
    image: "/social-media/twitter.png",
  },
  {
    label: "Instagram",
    value: "IG",
    image: "/social-media/IG.png",
  },
  {
    label: "LinkedIn",
    value: "LD",
    image: "/social-media/LD.png",
  },
  {
    label: "YouTube",
    value: "YT",
    image: "/social-media/YT.png",
  },
  {
    label: "TikTok",
    value: "TK",
    image: "/social-media/TK.png",
  },
  {
    label: "Snapchat",
    value: "SC",
    image: "/social-media/SC.png",
  },
];

function SocialMediaFilter() {
  // const searchParams = useSearchParams();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);

  const { createQueryString } = useQueryHelper();
  const router = useRouter();

  const handleSetValue = (val: string) => {
    if (value.includes(val)) {
      value.splice(value.indexOf(val), 1);
      setValue(value.filter((item) => item !== val));
    } else {
      setValue((prevValue) => [...prevValue, val]);
    }
  };

  React.useEffect(() => {
    const updatedQuery = createQueryString(
      "networks",
      value.join(",").toString()
    );
    router.push(`?${updatedQuery}`);
  }, [createQueryString, router, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full flex flex-col gap-2">
          <Label>Social Media</Label>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-darkColor border-[0.2px] border-gray-500 hover:bg-darkColor"
          >
            <div className="flex gap-2 justify-start">Select network...</div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0 bg-darkColor border-[0.2px] border-gray-500 hover:bg-darkColor">
        <Command className="bg-darkColor">
          <CommandGroup>
            <CommandList>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  className="py-2 hover:bg-mainColor flex justify-between data-[selected=true]:bg-mainColor"
                  onSelect={() => {
                    handleSetValue(item.value);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.image}
                      alt={item.value}
                      width={20}
                      height={20}
                    />
                    {item.label}
                  </div>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(item.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SocialMediaFilter;

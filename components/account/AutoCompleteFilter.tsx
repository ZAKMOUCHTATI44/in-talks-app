import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, type KeyboardEvent } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import CardModal from "./reports/CardModal";
import Error from "../utils/Error";

interface Pagination {
  data: Account[];
  total: string;
}

type AutoCompleteProps = {
  onValueChange: (value: Account) => void;
  placeholder?: string;
  type: "Brand" | "creators";
};

export const AutoCompleteFilter = ({
  placeholder,
  type,
  onValueChange,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Account>();
  const [inputValue, setInputValue] = useState<string>("");

  const buildQueryString = (): string => {
    let queryString = "/search";

    if (type === "Brand") {
      queryString = "/brands/search";
    }

    const name = inputValue;

    if (name != null) {
      queryString += `?q=${name}`;
    }
    return queryString;
  };

  const fetch = (): Promise<Pagination> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Pagination, Error>({
    queryKey: [buildQueryString(), inputValue],
    queryFn: fetch,
    enabled: inputValue !== "",
  });

  // Handle error rendering directly in JSX
  if (error) return <Error />;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    // Keep the options displayed when the user is typing
    if (!isOpen) {
      setOpen(true);
    }

    if (event.key === "Escape") {
      input.blur();
    }
  };

  const handleBlur = () => {
    setOpen(false);
    if (selected) {
      setInputValue(selected.name);
    }
  };

  return (
    <CommandPrimitive onKeyDown={handleKeyDown} className={`${type ==="creators" ? " w-[350px] " : "" } border-b-0`}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder ? placeholder : "Search for your brand"}
          className="text-sm"
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white dark:bg-darkColor outline-none border border-gray-600",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-0 ring-slate-200">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {data && data.data && data.data.length > 0 && !isLoading ? (
              <CommandGroup>
                {data.data.map((option) => {
                  const isSelected = selected?.name === option.name;
                  return (
                    <CommandItem
                      key={option.id}
                      value={option.name}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => {
                        setSelected(option);
                        onValueChange(option);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 hover:bg-mainColor data-[selected=true]:bg-mainColo"
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      <CardModal account={option} />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                Not found
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};

export default AutoCompleteFilter;

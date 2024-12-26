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

const OrderBy = () => {
  const { createQueryString } = useQueryHelper();
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = [
    {
      label: "By Default",
      value: "0",
    },
    {
      label: "Rank",
      value: "rank",
    },
    {
      label: "Score",
      value: "score",
    },
  ];

  return (
    <div className="flex">
      <Select
        value={searchParams.get("sort") || undefined}
        onValueChange={(e) => {
          router.push(`?${createQueryString("sort", e)}`);
        }}
      >
        <SelectTrigger className="w-[190px] bg-darkColor">
          <SelectValue placeholder="Order by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order by</SelectLabel>
            {data.map((item) => (
              <SelectItem key={item.label} value={item.value} className="py-1">
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrderBy;

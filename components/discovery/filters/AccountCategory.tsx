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

const AccountCategory = () => {
  const { createQueryString } = useQueryHelper();
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = [
    {
      label: "Nano (1k - 30k)",
      value: "1000-30000",
    },
    {
      label: "Micro (31k - 300k)",
      value: "3001-300000",
    },
    {
      label: "Macro (300k - 2M)",
      value: "300001-2000000",
    },
    {
      label: "Celebrities ( +2M)",
      value: "200000",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Influencer category</Label>
      <Select
        value={searchParams.get("range") || undefined}
        onValueChange={(e) => {
          router.push(`?${createQueryString("range", e)}`);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Influencer category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Social Media</SelectLabel>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value} className="py-2">
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AccountCategory;

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
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const GenderFilter = () => {
  const { createQueryString } = useQueryHelper();
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = [
    {
      label: "Male",
      value: "M",
      image: "/icons/male.png",
    },
    {
      label: "Female",
      value: "F",
      image: "/icons/female.png",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Gender</Label>
      <Select
        value={searchParams.get("gender") || undefined }
        onValueChange={(e) => {
          router.push(`?${createQueryString("gender", e)}`);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Gender</SelectLabel>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value} className="py-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={item.image}
                    alt={item.value}
                    width={20}
                    height={20}
                  />
                  {item.label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GenderFilter;

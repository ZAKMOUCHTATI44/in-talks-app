import { Label } from "@/components/ui/label";
import { useQueryHelper } from "@/components/utils/queryHelpers";
import { useRouter, useSearchParams } from "next/navigation";

const AccountType = () => {
  const { createQueryString } = useQueryHelper();
  const router = useRouter();
  const searchParams = useSearchParams();


  const data = [
    {
      label: "Creators",
      value: "creators",
    },
    {
      label: "Brand",
      value: "brands",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Account Type</Label>

      <div className="grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.label} className="flex w-full">
            <input
              type="radio"
              defaultChecked={searchParams.get('type') ? item.value === searchParams.get('type') :item.value === "creators" }
              name="profil"
              value={item.value}
              id={item.value}
              className="peer hidden"
              onChange={(e) => {
                router.push(`?${createQueryString("type", e.target.value)}`);
              }}
            />
            <label
              htmlFor={item.value}
              className="w-full text-center text-gray-800 dark:text-whiteColor text-sm select-none cursor-pointer rounded-md border border-gray-600
   py-1 px-6 transition-colors duration-200 ease-in-out peer-checked:text-white peer-checked:bg-mainColor peer-checked:border-mainColor "
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>

      {/* <Select
        onValueChange={(e) => {
          router.push(`?${createQueryString("type", e)}`);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Account Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Account Type</SelectLabel>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value} className="py-2">
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> */}
    </div>
  );
};

export default AccountType;

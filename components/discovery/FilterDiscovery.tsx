import React from "react";
import SocialMediaFilter from "./filters/SocialMediaFilter";
import CategoriesFilter from "./filters/CategoriesFilter";
import AccountCategory from "./filters/AccountCategory";
import GenderFilter from "./filters/GenderFilter";
import CountryFilter from "./filters/CountryFilter";
import AccountType from "./filters/AccountType";
// import { Button } from "../ui/button";
// import { Filter, RotateCcw } from "lucide-react";
// import { useRouter } from "next/navigation";


const FilterDiscovery = () => {
  // const router = useRouter()



  return (
    <div className="py-5 px-2 flex flex-col gap-5 bg-white dark:bg-darkColor rounded-lg shadow-md border border-gray-700">
      <div className="py-5 flex flex-col gap-5 items-center">
      
        <SocialMediaFilter />
        <CategoriesFilter />
        {/* <SelectCategory /> */}
        <AccountCategory />
        <GenderFilter />
        <CountryFilter />
        <AccountType />
        {/* <div className="flex w-full gap-2">
          <Button className="bg-mainColor text-white hover:bg-mainColor w-full">
            <Filter />
            Filter
          </Button>
          <Button onClick={() => {
            router.push("/discovery")
          }} className="bg-transparent border border-mainColor text-mainColor">
            <RotateCcw />
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default FilterDiscovery;

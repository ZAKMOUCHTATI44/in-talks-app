import React from "react";
import CategoriesFilter from "../discovery/filters/CategoriesFilter";
import SocialMediaFilter from "../discovery/filters/SocialMediaFilter";
import GenderFilter from "../discovery/filters/GenderFilter";
import { Button } from "../ui/button";
import { Filter, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

const FilterRanking = () => {
    const router = useRouter()
  return (
    <div className="bg-darkColor shadow-md rounded-md pt-12 px-12">
      <h4 className="text-center font-bold text-2xl">🏆 Top 200 Creators Ranking</h4>
      <div className="flex gap-2 my-12 items-end">
        <SocialMediaFilter />
        <CategoriesFilter />
        <GenderFilter />
        <div className="flex gap-2">
            <Button className="bg-mainColor text-white flex items-center gap-2 hover:bg-mainColor">
                <Filter />
                Filter
            </Button>
            <Button onClick={() => router.push("/ranking")}  size={"icon"} className="bg-mainColor text-white flex items-center gap-2 hover:bg-mainColor">
                <RefreshCcw />
            </Button>

        </div>
      </div>
    </div>
  );
};

export default FilterRanking;

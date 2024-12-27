import { Star } from "lucide-react";
import React from "react";
import FollowersDisptach from "./FollowersDisptach";

const NicheAccount = ({ data }: { data: Account }) => {
  return (
    <div className="dark:bg-darkColor bg-white dark:text-whiteColor text-black shadow-lg border-gray-200 dark:border-gray-600 border py-5 px-5 rounded-md flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold">Industries & Niches</h4>
        <p className="border border-gray-600 py-2 px-5 rounded-md flex gap-2">
          <Star fill="#FFF" className="text-yellow-400 h-5 w-5" /> 
          Marketing & Sales
        </p>
      </div>

      <FollowersDisptach data={data.accounts} />

    </div>
  );
};

export default NicheAccount;
